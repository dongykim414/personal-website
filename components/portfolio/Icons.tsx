import type { SVGProps } from "react";

type IconName = "arrow" | "external" | "download" | "mail" | "back" | "plus" | "up" | "down" | "close" | "reset";
const paths: Record<IconName, string> = {
  arrow: "M4 12h16m-6-6 6 6-6 6",
  external: "M7 17 17 7M7 7h10v10",
  download: "M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5",
  mail: "M3 5h18v14H3zM3 6l9 7 9-7",
  back: "M20 12H4m6-6-6 6 6 6",
  plus: "M12 5v14M5 12h14",
  up: "m6 14 6-6 6 6",
  down: "m6 10 6 6 6-6",
  close: "m6 6 12 12M6 18 18 6",
  reset: "M3 10a9 9 0 1 1 1 7M3 4v6h6",
};
export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[name]} /></svg>;
}
