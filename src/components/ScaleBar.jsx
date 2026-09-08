import { AGGREGATE } from '../data.js'

// 合計市值 vs 合計年化營收。比例約 110:1，營收那條刻意畫成細線——那就是重點。
export default function ScaleBar() {
  const { mcap, annualRevenue } = AGGREGATE
  const W = 1000
  const mcapM = mcap * 1000
  const revW = Math.max(Math.round((annualRevenue / mcapM) * W), 3)
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div className="scale">
      <svg
        viewBox={`0 0 ${W} 132`}
        role="img"
        aria-label={`七家合計市值 ${mcap} 十億美元，五家合計年化營收 ${annualRevenue} 百萬美元`}
      >
        <rect x="0" y="14" width={W} height="34" fill="var(--gov)">
          {!reduce && <animate attributeName="width" from="0" to={W} dur="0.8s" fill="freeze" />}
        </rect>
        <text x="14" y="37" fill="#fff" fontSize="17" fontFamily="inherit">
          七家合計市值 ${mcap.toFixed(1)}bn
        </text>
        <rect x="0" y="72" width={revW} height="34" fill="var(--rev)" />
        <text x={revW + 14} y="95" fill="var(--ink)" fontSize="17" fontFamily="inherit">
          五家合計年化營收 ${annualRevenue}m
        </text>
        <line x1="0" y1="120" x2={W} y2="120" stroke="var(--rule)" />
      </svg>
    </div>
  )
}
