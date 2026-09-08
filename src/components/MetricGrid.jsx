import { useMemo, useState } from 'react'
import { COMPANIES, METRICS, FLAG_TYPES } from '../data.js'

// 每個指標的長條以該欄絕對值最大者為基準
function useScales() {
  return useMemo(() => {
    const s = {}
    for (const m of METRICS) {
      const vals = COMPANIES.map((c) => c.cells[m.key]?.v)
        .filter((v) => typeof v === 'number')
        .map(Math.abs)
      s[m.key] = vals.length ? Math.max(...vals, 0.0001) : 1
    }
    return s
  }, [])
}

export default function MetricGrid() {
  const scales = useScales()
  const [sort, setSort] = useState({ key: 'mcap', dir: 'desc' })
  const [active, setActive] = useState({ ci: 0, mk: 'mcap' })

  const rows = useMemo(() => {
    const arr = COMPANIES.map((c, i) => ({ c, i }))
    arr.sort((a, b) => {
      const av = a.c.cells[sort.key]?.v
      const bv = b.c.cells[sort.key]?.v
      if (av == null && bv == null) return 0
      if (av == null) return 1 // 未揭露一律沉底
      if (bv == null) return -1
      return sort.dir === 'desc' ? bv - av : av - bv
    })
    return arr
  }, [sort])

  function toggleSort(key) {
    setSort((s) =>
      s.key === key ? { key, dir: s.dir === 'desc' ? 'asc' : 'desc' } : { key, dir: 'desc' }
    )
  }

  const company = COMPANIES[active.ci]
  const metric = METRICS.find((m) => m.key === active.mk)
  const cell = company.cells[active.mk]
  const flag = cell.flag ? FLAG_TYPES[cell.flag] : null

  return (
    <div className="panel">
      <div className="gridwrap">
        <table className="grid">
          <thead>
            <tr>
              <th className="co">公司</th>
              {METRICS.map((m) => (
                <th key={m.key} scope="col">
                  <button
                    type="button"
                    onClick={() => toggleSort(m.key)}
                    data-active={sort.key === m.key}
                    aria-label={`依${m.label}排序`}
                  >
                    {m.label}
                    {sort.key === m.key && (
                      <span className="arrow" aria-hidden="true">
                        {sort.dir === 'desc' ? '▼' : '▲'}
                      </span>
                    )}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ c, i }) => (
              <tr key={c.name} className={active.ci === i ? 'sel' : ''}>
                <td className="co">
                  <span className="nm">{c.name}</span>
                  <span className="st">{c.status}</span>
                </td>
                {METRICS.map((m) => {
                  const cl = c.cells[m.key] || { v: null, d: '—' }
                  const pct =
                    typeof cl.v === 'number' ? (Math.abs(cl.v) / scales[m.key]) * 100 : 0
                  const cls = ['cell', cl.v == null ? 'dim' : '', cl.flag ? `flag-${cl.flag}` : '']
                    .filter(Boolean)
                    .join(' ')
                  const on = () => setActive({ ci: i, mk: m.key })
                  const neg = typeof cl.v === 'number' && cl.v < 0
                  return (
                    <td key={m.key}>
                      <button
                        type="button"
                        className={cls}
                        onMouseEnter={on}
                        onFocus={on}
                        onClick={on}
                        aria-label={`${c.name} ${m.label} ${cl.d}`}
                      >
                        <span className="v">{cl.d}</span>
                        <span className="track">
                          <i
                            style={{
                              width: `${Math.max(pct, 0)}%`,
                              background:
                                m.tone === 'loss' || neg ? 'var(--loss)' : 'var(--rev)',
                            }}
                          />
                        </span>
                      </button>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="inspect" aria-live="polite">
        <div>
          <div className="big">{cell.d}</div>
          <div className="lbl">
            {company.name}
            {company.ticker ? `（${company.ticker}）` : ''} · {metric.label}
            {metric.unit ? `　${metric.unit}` : ''}
          </div>
        </div>
        <div>
          {flag && (
            <span className={`tag${cell.flag === 'check' ? '' : ' warm'}`}>{flag.label}</span>
          )}
          <p className="body">{cell.note}</p>
        </div>
      </div>

      <div className="legend">
        <span>
          <i style={{ background: 'var(--loss)' }} />
          未揭露或由其他指標推估
        </span>
        <span>
          <i style={{ background: 'var(--com)' }} />
          期別不同或 GAAP／調整後口徑衝突
        </span>
        <span>長條以該欄絕對值最大者為基準；點欄位標題可排序，未揭露一律沉底</span>
      </div>
    </div>
  )
}
