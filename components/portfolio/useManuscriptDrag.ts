"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { DragEvent, MouseEvent, PointerEvent as ReactPointerEvent, RefObject } from "react";

interface DragSession {
  id: string;
  pointerId: number;
  startX: number;
  startY: number;
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
  started: boolean;
}

export interface DragPreview {
  id: string;
  left: number;
  top: number;
  width: number;
  height: number;
  slot: number | null;
}

const ACTIVATION_DISTANCE = 8;
const DROP_MARGIN = 24;
const SCROLL_EDGE = 80;
const SCROLL_SPEED = 600;

// A card represents its final position, so dropping on the last card really
// means moving to the end. Convert that position to a pre-removal boundary once.
function insertionSlot(grid: HTMLOListElement, id: string, x: number, y: number): number | null {
  const bounds = grid.getBoundingClientRect();
  if (x < bounds.left - DROP_MARGIN || x > bounds.right + DROP_MARGIN || y < bounds.top - DROP_MARGIN || y > bounds.bottom + DROP_MARGIN) return null;
  const cards = Array.from(grid.querySelectorAll<HTMLElement>("[data-manuscript]")).map((element, index) => ({ id: element.dataset.manuscript, index, rect: element.getBoundingClientRect() }));
  const from = cards.findIndex((card) => card.id === id);
  if (from < 0) return null;
  // Compare rows first, then horizontal centers. This also handles the empty
  // cells after the final card in an incomplete row.
  const verticalDistance = (rect: DOMRect) => Math.max(rect.top - y, 0, y - rect.bottom);
  const nearestRow = cards.reduce((best, card) => verticalDistance(card.rect) < verticalDistance(best.rect) ? card : best);
  const row = cards.filter((card) => Math.abs(card.rect.top - nearestRow.rect.top) < 5);
  const target = row.reduce((best, card) => Math.abs(x - (card.rect.left + card.rect.width / 2)) < Math.abs(x - (best.rect.left + best.rect.width / 2)) ? card : best);
  return target.index > from ? target.index + 1 : target.index;
}

export function useManuscriptDrag(
  root: RefObject<HTMLDivElement | null>,
  grid: RefObject<HTMLOListElement | null>,
  onDrop: (id: string, slot: number) => void,
  onCancel: () => void,
) {
  const session = useRef<DragSession | null>(null);
  const frame = useRef<number | null>(null);
  const lastFrameTime = useRef<number | null>(null);
  const suppressClick = useRef(false);
  const callbacks = useRef({ onDrop, onCancel });
  const [preview, setPreview] = useState<DragPreview | null>(null);

  useLayoutEffect(() => { callbacks.current = { onDrop, onCancel }; }, [onDrop, onCancel]);

  const stopFrame = useCallback(() => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    lastFrameTime.current = null;
  }, []);

  const finish = useCallback((commit: boolean) => {
    const current = session.current;
    if (!current) return;
    const slot = grid.current ? insertionSlot(grid.current, current.id, current.x, current.y) : null;
    session.current = null;
    stopFrame();
    setPreview(null);
    if (root.current?.hasPointerCapture(current.pointerId)) root.current.releasePointerCapture(current.pointerId);
    if (!current.started) return;
    if (commit && slot !== null) callbacks.current.onDrop(current.id, slot);
    else callbacks.current.onCancel();
  }, [grid, root, stopFrame]);

  useEffect(() => {
    const tick = (time: number) => {
      frame.current = null;
      const current = session.current;
      const list = grid.current;
      if (!current?.started || !list) return;
      const elapsed = Math.min((time - (lastFrameTime.current ?? time)) / 1000, .04);
      lastFrameTime.current = time;
      const bounds = list.getBoundingClientRect();
      const inHorizontalRange = current.x >= bounds.left - DROP_MARGIN && current.x <= bounds.right + DROP_MARGIN;
      let velocity = 0;
      if (inHorizontalRange && current.y >= 0 && current.y <= window.innerHeight) {
        if (current.y < SCROLL_EDGE && bounds.top < SCROLL_EDGE) velocity = -SCROLL_SPEED * (1 - current.y / SCROLL_EDGE);
        else if (current.y > window.innerHeight - SCROLL_EDGE && bounds.bottom > window.innerHeight - SCROLL_EDGE) velocity = SCROLL_SPEED * (1 - (window.innerHeight - current.y) / SCROLL_EDGE);
      }
      if (velocity) window.scrollBy({ top: velocity * elapsed, behavior: "instant" });
      const next: DragPreview = { id: current.id, left: current.x - current.offsetX, top: current.y - current.offsetY, width: current.width, height: current.height, slot: insertionSlot(list, current.id, current.x, current.y) };
      setPreview((previous) => previous?.id === next.id && previous.left === next.left && previous.top === next.top && previous.slot === next.slot ? previous : next);
      frame.current = requestAnimationFrame(tick);
    };
    const pointermove = (event: PointerEvent) => {
      const current = session.current;
      if (!current || current.pointerId !== event.pointerId) return;
      current.x = event.clientX;
      current.y = event.clientY;
      if (!current.started) {
        if (Math.hypot(current.x - current.startX, current.y - current.startY) < ACTIVATION_DISTANCE) return;
        current.started = true;
        suppressClick.current = true;
      }
      if (event.cancelable) event.preventDefault();
      if (frame.current === null) frame.current = requestAnimationFrame(tick);
    };
    const pointerup = (event: PointerEvent) => {
      const current = session.current;
      if (!current || current.pointerId !== event.pointerId) return;
      current.x = event.clientX;
      current.y = event.clientY;
      finish(true);
    };
    const pointercancel = (event: PointerEvent) => {
      if (session.current?.pointerId === event.pointerId) finish(false);
    };
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && session.current) { event.preventDefault(); finish(false); }
    };
    const cancel = () => finish(false);
    const visibility = () => { if (document.hidden) cancel(); };
    // Capture-phase window listeners survive changes in the element beneath the
    // pointer and keep the same session alive across every card and row.
    window.addEventListener("pointermove", pointermove, { capture: true, passive: false });
    window.addEventListener("pointerup", pointerup, true);
    window.addEventListener("pointercancel", pointercancel, true);
    window.addEventListener("keydown", keydown);
    window.addEventListener("blur", cancel);
    window.addEventListener("resize", cancel);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      window.removeEventListener("pointermove", pointermove, true);
      window.removeEventListener("pointerup", pointerup, true);
      window.removeEventListener("pointercancel", pointercancel, true);
      window.removeEventListener("keydown", keydown);
      window.removeEventListener("blur", cancel);
      window.removeEventListener("resize", cancel);
      document.removeEventListener("visibilitychange", visibility);
      session.current = null;
      stopFrame();
    };
  }, [finish, grid, stopFrame]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0 || session.current) return;
    suppressClick.current = false;
    const target = event.target as HTMLElement;
    const handle = target.closest("[data-drag-handle]");
    const surface = target.closest("[data-drag-surface]");
    if (!handle && (!surface || event.pointerType === "touch" || target.closest("button"))) return;
    const card = target.closest<HTMLElement>("[data-manuscript]");
    if (!card?.dataset.manuscript || !grid.current?.contains(card)) return;
    const bounds = card.getBoundingClientRect();
    session.current = { id: card.dataset.manuscript, pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, x: event.clientX, y: event.clientY, offsetX: event.clientX - bounds.left, offsetY: event.clientY - bounds.top, width: bounds.width, height: bounds.height, started: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  return {
    preview,
    handlers: {
      onPointerDown,
      onDragStart: (event: DragEvent<HTMLDivElement>) => event.preventDefault(),
      onClickCapture: (event: MouseEvent<HTMLDivElement>) => {
        if (suppressClick.current && event.detail > 0) { suppressClick.current = false; event.preventDefault(); event.stopPropagation(); }
      },
    },
  };
}
