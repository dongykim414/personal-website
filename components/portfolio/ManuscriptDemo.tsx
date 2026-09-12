"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { useManuscriptDrag } from "./useManuscriptDrag";
import { Icon } from "./Icons";
import styles from "./site.module.css";

interface ManuscriptPage { id: string; name: string; url?: string; tone: number }
const samples: ManuscriptPage[] = [
  { id: "intro", name: "01_프롤로그", tone: 0 },
  { id: "meeting", name: "02_첫 만남", tone: 1 },
  { id: "journey", name: "03_새로운 시작", tone: 2 },
  { id: "ending", name: "04_다음 이야기", tone: 3 },
];
const MAX_FILES = 8;
const MAX_BYTES = 8 * 1024 * 1024;

export default function ManuscriptDemo() {
  const inputId = useId();
  const root = useRef<HTMLDivElement>(null);
  const urls = useRef(new Set<string>());
  const grid = useRef<HTMLOListElement>(null);
  const [pages, setPages] = useState<ManuscriptPage[]>(samples);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const commitDrop = useCallback((id: string, slot: number) => {
    const from = pages.findIndex((page) => page.id === id);
    if (from < 0) return;
    const to = slot > from ? slot - 1 : slot;
    const next = [...pages];
    const [page] = next.splice(from, 1);
    next.splice(to, 0, page);
    setPages(next);
    setMessage(to === from ? "원래 순서를 유지했습니다." : `${page.name}, ${to + 1}번째로 이동했습니다.`);
  }, [pages]);
  const cancelDrop = useCallback(() => setMessage("이동을 취소했습니다. 원래 순서를 유지합니다."), []);
  const { preview, handlers } = useManuscriptDrag(root, grid, commitDrop, cancelDrop);
  const activePage = pages.find((page) => page.id === preview?.id);
  const fromIndex = pages.findIndex((page) => page.id === preview?.id);
  const targetIndex = preview?.slot == null ? null : preview.slot > fromIndex ? preview.slot - 1 : preview.slot;

  useEffect(() => {
    const objectUrls = urls.current;
    return () => { objectUrls.forEach((url) => URL.revokeObjectURL(url)); objectUrls.clear(); };
  }, []);

  const move = (id: string, direction: number) => {
    const from = pages.findIndex((page) => page.id === id);
    const to = from + direction;
    if (from < 0 || to < 0 || to >= pages.length) return;
    const next = [...pages];
    const [page] = next.splice(from, 1);
    next.splice(to, 0, page);
    setPages(next);
    setMessage(`${page.name}, ${to + 1}번째로 이동했습니다.`);
  };

  const addFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    setError("");
    const available = MAX_FILES - pages.length;
    const accepted: ManuscriptPage[] = [];
    const issues: string[] = [];
    for (const file of files) {
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) { issues.push("JPG, PNG, WebP 이미지만 추가할 수 있습니다."); continue; }
      if (file.size > MAX_BYTES) { issues.push("이미지 한 장은 8MB 이하여야 합니다."); continue; }
      if (accepted.length >= available) { issues.push("샘플을 포함해 최대 8장까지 추가할 수 있습니다."); break; }
      const url = URL.createObjectURL(file);
      urls.current.add(url);
      accepted.push({ id: crypto.randomUUID(), name: file.name, url, tone: 0 });
    }
    setPages((current) => [...current, ...accepted]);
    if (accepted.length) setMessage(`${accepted.length}장을 추가했습니다.`);
    setError([...new Set(issues)].join(" "));
  };

  const remove = (page: ManuscriptPage) => {
    if (page.url) { URL.revokeObjectURL(page.url); urls.current.delete(page.url); }
    setPages((current) => current.filter((item) => item.id !== page.id));
    setMessage(`${page.name}을 삭제했습니다.`);
    setError("");
  };

  const reset = () => {
    urls.current.forEach((url) => URL.revokeObjectURL(url));
    urls.current.clear();
    setPages(samples);
    setError("");
    setMessage("샘플 원고의 처음 순서로 돌아왔습니다.");
  };

  return <div className={`${styles.demoPanel} ${preview ? styles.editorDragging : ""}`} ref={root} {...handlers}>
    <div className={styles.demoHeader}><div><span className={styles.liveLabel}><span /> INTERACTIVE DEMO</span><h4>원고의 순서를 바꿔 보세요</h4></div><span className={styles.sampleBadge}>로컬 체험</span></div>
    <p className={styles.demoDescription}>원하는 순번의 원고 위로 끌어 놓으세요. 첫 장에서 마지막 장까지 한 번에 이동할 수 있습니다. 모바일은 손잡이를 사용하고, 화면 위·아래 끝에 가까이 가면 자동으로 스크롤됩니다. 방향키와 순서 버튼으로도 편집할 수 있습니다.</p>
    <div className={styles.editorToolbar}>
      <span>{pages.length} / {MAX_FILES}장</span>
      <div><label htmlFor={inputId} className={styles.smallButton}><Icon name="plus" /> 이미지 추가<input id={inputId} className={styles.fileInput} type="file" accept="image/png,image/jpeg,image/webp" multiple onChange={addFiles} disabled={!!preview || pages.length >= MAX_FILES} /></label><button type="button" className={styles.smallButton} onClick={reset} disabled={!!preview}><Icon name="reset" /> 초기화</button></div>
    </div>
    {error && <p className={styles.demoError} role="alert">{error}</p>}
    <p className={styles.dragFeedback} aria-live="polite">{preview ? targetIndex === null ? "영역 밖입니다. 여기서 놓으면 이동이 취소됩니다." : `${targetIndex + 1}번째 위치에 놓기 · Esc로 취소` : "손잡이로 이동 · 영역 밖에 놓으면 취소"}</p>
    <ol className={styles.manuscriptGrid} ref={grid}>
      {pages.map((page, index) => <li key={page.id} data-manuscript={page.id} data-drop-target={!!preview && targetIndex === index && targetIndex !== fromIndex || undefined} data-insert-before={!!preview && targetIndex === index && index < fromIndex || undefined} data-insert-after={!!preview && targetIndex === index && index > fromIndex || undefined} className={`${styles.manuscriptCard} ${preview?.id === page.id ? styles.dragSource : ""}`}>
        <div className={styles.manuscriptPreview} data-drag-surface onDragStart={(event) => event.preventDefault()}>
          {page.url ? <img src={page.url} alt={page.name} onError={() => setError(`${page.name}: 이미지 미리보기를 불러올 수 없습니다. 파일을 삭제하고 다른 이미지를 추가해 주세요.`)} /> : <div className={styles.samplePage} data-tone={page.tone} aria-label={`${page.name} 샘플 페이지`}><span>STORY / {String(page.tone + 1).padStart(2, "0")}</span><strong>{["이야기의\n시작", "우연한\n만남", "새로운\n여정", "다음\n이야기"][page.tone]}</strong><span>샘플 원고</span></div>}
          <span className={styles.pageOrder}>{index + 1}</span>
          <button type="button" className={styles.removePage} disabled={!!preview} onClick={() => remove(page)} aria-label={`${page.name} 삭제`}><Icon name="close" width="14" height="14" /></button>
        </div>
        <div className={styles.manuscriptName} title={page.name}>{page.name}</div>
        <div className={styles.reorderControls}>
          <button type="button" aria-label={`${page.name} 앞 순서로 이동`} disabled={!!preview || index === 0} onClick={() => move(page.id, -1)}><Icon name="back" width="15" height="15" /></button>
          <button type="button" className={styles.dragHandle} data-drag-handle aria-label={`${page.name} 이동 손잡이. 키보드 좌우 방향키로 순서를 바꿀 수 있습니다.`}
            onKeyDown={(event) => { if (preview) return; if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); move(page.id, -1); } else if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); move(page.id, 1); } }}><span aria-hidden="true">⠿</span><span className={styles.handleLabel}>이동</span></button>
          <button type="button" aria-label={`${page.name} 뒤 순서로 이동`} disabled={!!preview || index === pages.length - 1} onClick={() => move(page.id, 1)}><Icon name="arrow" width="15" height="15" /></button>
        </div>
      </li>)}
    </ol>
    {preview && activePage && <div className={styles.dragOverlay} aria-hidden="true" style={{ width: preview.width, minHeight: preview.height, transform: `translate3d(${preview.left}px, ${preview.top}px, 0)` }}>
      <div className={styles.manuscriptPreview}>{activePage.url ? <img src={activePage.url} alt="" draggable={false} /> : <div className={styles.samplePage} data-tone={activePage.tone}><span>STORY / {String(activePage.tone + 1).padStart(2, "0")}</span><strong>{["이야기의\n시작", "우연한\n만남", "새로운\n여정", "다음\n이야기"][activePage.tone]}</strong><span>샘플 원고</span></div>}</div>
      <div className={styles.manuscriptName}>{activePage.name}</div><div className={styles.overlayPosition}>{targetIndex === null ? "놓으면 취소" : `${targetIndex + 1}번째로 이동`}</div>
    </div>}
    {pages.length === 0 && <div className={styles.emptyEditor}>이미지를 추가하거나 초기화를 눌러 샘플 원고를 다시 불러오세요.</div>}
    <div className={styles.orderOutput}><span>현재 편집 순서</span><p>{pages.length ? pages.map((page) => page.name).join(" → ") : "아직 원고가 없습니다."}</p></div>
    <p className={styles.srOnly} role="status" aria-live="polite">{message}</p>
    <p className={styles.demoNote}>순서 편집을 재구성한 데모입니다. 선택한 이미지는 서버로 전송되지 않고 새로고침하면 사라집니다. 원본 제품의 ZIP 업로드·서버 전송·규격 변환은 포함하지 않습니다.</p>
  </div>;
}
