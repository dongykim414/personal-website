"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useId, useState } from "react";
import type { MouseEvent } from "react";
import styles from "./site.module.css";
type Metric = "sales" | "rank";
const sales = [32, 37, 34, 48, 46, 57, 51, 63, 59, 75, 72, 86, 81, 94];
const average = [35, 36, 38, 37, 41, 42, 44, 43, 48, 49, 47, 53, 55, 57];
const rank = [42, 39, 41, 33, 35, 28, 30, 23, 25, 19, 20, 14, 16, 10];
const W = 680;
const H = 280;
const LEFT = 45;
const RIGHT = 24;
const TOP = 24;
const BOTTOM = 37;
export default function ChartDemo() {
    const { t } = useLanguage();
    const id = useId();
    const [metric, setMetric] = useState<Metric>("sales");
    const [compare, setCompare] = useState(true);
    const [selected, setSelected] = useState(13);
    const [sort, setSort] = useState<"date" | "value">("date");
    const [ascending, setAscending] = useState(false);
    const data = metric === "sales" ? sales : rank;
    const isRank = metric === "rank";
    const format = (value: number) => isRank ? t("{0}위", value) : t("{0}만원", value);
    const x = (index: number) => LEFT + (index / (data.length - 1)) * (W - LEFT - RIGHT);
    const y = (value: number) => TOP + (isRank ? (value - 1) / 49 : 1 - value / 100) * (H - TOP - BOTTOM);
    const linePath = (values: number[]) => values.map((value, index) => `${index === 0 ? "M" : "L"}${x(index)},${y(value)}`).join(" ");
    const ticks = isRank ? [1, 10, 20, 30, 40, 50] : [0, 25, 50, 75, 100];
    const rows = data.map((value, index) => ({ value, index })).sort((a, b) => (ascending ? 1 : -1) * (sort === "date" ? a.index - b.index : a.value - b.value));
    const sortBy = (key: "date" | "value") => { if (sort === key)
        setAscending(!ascending);
    else {
        setSort(key);
        setAscending(false);
    } };
    const total = sales.reduce((sum, value) => sum + value, 0);
    const averageTotal = average.reduce((sum, value) => sum + value, 0);
    const difference = sales[selected] - average[selected];
    const onMove = (event: MouseEvent<SVGSVGElement>) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const position = (event.clientX - bounds.left) / bounds.width * W;
        setSelected(Math.max(0, Math.min(13, Math.round((position - LEFT) / (W - LEFT - RIGHT) * 13))));
    };
    return <div className={styles.demoPanel}>
    <div className={styles.demoHeader}><div><span className={styles.liveLabel}><span /> INTERACTIVE DEMO</span><h4>{t("작품 성과 리포트")}</h4></div><span className={styles.sampleBadge}>{t("샘플 데이터")}</span></div>
    <p className={styles.demoDescription}>{t("8월 1일–14일 · 가상 작품 A의 매출과 순위 예시입니다. 기간 요약에서 추이를 파악하고, 차트와 일별 표에서 비교 수치를 확인할 수 있습니다.")}</p>
    <dl className={styles.metricSummary}><div><dt>{t("기간 누적 매출")}</dt><dd>{total.toLocaleString()}<small>{t("만원")}</small></dd><span>{t("14일 합계 · 샘플")}</span></div><div><dt>{t("장르 평균 대비")}</dt><dd>+{((total / averageTotal - 1) * 100).toFixed(1)}<small>%</small></dd><span>{t("동일 기간 누적 매출 비교")}</span></div><div><dt>{t("마지막 날 순위")}</dt><dd>{rank[13]}<small>{t("위")}</small></dd><span>{t("첫날 대비")}{rank[0] - rank[13]}{t("계단 상승")}</span></div></dl>
    <div className={styles.demoControls}>
      <div className={styles.segmented} role="group" aria-label={t("표시할 지표")}>
        <button type="button" aria-pressed={!isRank} onClick={() => setMetric("sales")}>{t("매출")}</button>
        <button type="button" aria-pressed={isRank} onClick={() => setMetric("rank")}>{t("순위")}</button>
      </div>
      {!isRank ? <label className={styles.checkbox}><input type="checkbox" checked={compare} onChange={(event) => setCompare(event.target.checked)}/>{t("장르 평균 비교")}</label> : <span className={styles.axisHint}>{t("상위 순위가 위에 표시됩니다 ↑")}</span>}
    </div>
    <div className={styles.chartValue}><span>{t("8월")}{selected + 1}{t("일")}</span><strong>{format(data[selected])}</strong>{!isRank && compare && <span>{t("장르 평균")}{average[selected]}{t("만원")}</span>}</div>
    <svg className={styles.chart} viewBox={`0 0 ${W} ${H}`} onPointerMove={(event) => { if (event.pointerType === "mouse")
        onMove(event); }} onClick={onMove} onPointerLeave={() => setSelected(13)} role="img" aria-labelledby={`${id}-title ${id}-description`}>
      <title id={`${id}-title`}>{isRank ? t("샘플 작품 순위 추이") : t("샘플 작품과 장르 평균의 매출 추이")}</title>
      <desc id={`${id}-description`}>{t("8월 1일부터 14일까지의 예시입니다. 아래 일별 데이터 표에서 모든 값을 확인할 수 있습니다.")}</desc>
      {!isRank && <path d={`${linePath(sales)} L${x(13)},${H - BOTTOM} L${x(0)},${H - BOTTOM} Z`} fill="var(--accent)" opacity=".06"/>}
      {ticks.map((tick) => <g key={tick}><line x1={LEFT} y1={y(tick)} x2={W - RIGHT} y2={y(tick)} stroke="var(--line)" strokeDasharray="3 5"/><text x={LEFT - 10} y={y(tick) + 4} textAnchor="end" className={styles.chartAxis}>{tick}{isRank ? t("위") : ""}</text></g>)}
      {[0, 3, 6, 9, 13].map((index) => <text key={index} x={x(index)} y={H - 9} textAnchor="middle" className={styles.chartAxis}>8/{index + 1}</text>)}
      {!isRank && compare && <path d={linePath(average)} fill="none" stroke="#8398a9" strokeWidth="2" strokeDasharray="5 5"/>}
      <path d={linePath(data)} fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1={x(selected)} x2={x(selected)} y1={TOP} y2={H - BOTTOM} stroke="var(--accent)" opacity=".25"/>
      {!isRank && compare && <circle cx={x(selected)} cy={y(average[selected])} r="4" fill="#8398a9" stroke="white" strokeWidth="2"/>}
      <circle cx={x(selected)} cy={y(data[selected])} r="5" fill="var(--accent)" stroke="white" strokeWidth="2"/>
    </svg>
    <div className={styles.chartLegend}><span><i />{t("대상 작품")}</span>{!isRank && compare && <span><i className={styles.comparisonDot}/>{t("장르 평균")}</span>}<span className={styles.chartUnit}>{isRank ? t("단위: 위") : t("단위: 만원")}</span></div>
    <p className={styles.metricInsight}>{isRank ? t("8월 {0}일 순위는 {1}위입니다. 순위는 숫자가 작을수록 상단에 표시됩니다.", selected + 1, rank[selected]) : t("8월 {0}일 매출은 장르 평균보다 {1}만원 {2}.", selected + 1, Math.abs(difference), difference >= 0 ? t("높습니다") : t("낮습니다"))}</p>
    <div className={styles.reportTableHeader}><h5>{t("일별 상세 데이터")}</h5><span>{t("14개 기록 · 열 제목으로 정렬")}</span></div>
    <div className={`${styles.tableScroll} ${styles.reportTable}`} tabIndex={0} role="region" aria-label={t("일별 상세 데이터 표, 가로 스크롤 가능")}><table><caption className={styles.srOnly}>{isRank ? t("샘플 순위 데이터") : t("샘플 매출 및 장르 평균 비교")}</caption><thead><tr><th scope="col" aria-sort={sort === "date" ? ascending ? "ascending" : "descending" : "none"}><button type="button" onClick={() => sortBy("date")}>{t("날짜")}{sort === "date" ? ascending ? "↑" : "↓" : "↕"}</button></th><th scope="col" aria-sort={sort === "value" ? ascending ? "ascending" : "descending" : "none"}><button type="button" onClick={() => sortBy("value")}>{isRank ? t("작품 순위") : t("작품 매출")} {sort === "value" ? ascending ? "↑" : "↓" : "↕"}</button></th><th scope="col">{isRank ? t("전일 대비") : t("장르 평균")}</th><th scope="col">{isRank ? t("첫날 대비") : t("평균 대비")}</th></tr></thead><tbody>{rows.map(({ value, index }) => <tr key={index} data-selected={selected === index || undefined}><th scope="row"><button type="button" onClick={() => setSelected(index)} aria-pressed={selected === index}>{t("8월")}{index + 1}{t("일")}</button></th><td>{format(value)}</td><td>{isRank ? index === 0 ? "—" : rank[index - 1] === value ? t("변동 없음") : t("{0}계단 {1}", Math.abs(rank[index - 1] - value), rank[index - 1] > value ? t("상승") : t("하락")) : t("{0}만원", average[index])}</td><td>{isRank ? t("{0}계단 상승", rank[0] - value) : `${value >= average[index] ? "+" : ""}${((value / average[index] - 1) * 100).toFixed(1)}%`}</td></tr>)}</tbody></table></div>
    <p className={styles.demoNote}>{t("이 사이트에서 SVG와 React로 재구성한 체험용 예시입니다. 실제 제품에서는 D3를 계산에 사용했으며, 위 수치는 실제 성과가 아닙니다.")}</p>
  </div>;
}
