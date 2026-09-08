import { useMemo } from 'react'
import { CHIPS } from '../data.js'

export default function ChipsTable() {
  const { total, fab, hw } = useMemo(() => {
    const t = CHIPS.reduce((s, r) => s + r.amount, 0)
    const f = CHIPS.filter((r) => r.track === '晶圓廠').reduce((s, r) => s + r.amount, 0)
    return { total: t, fab: f, hw: t - f }
  }, [])

  return (
    <div className="panel">
      <div className="split" role="img" aria-label={`晶圓廠 ${fab} 百萬美元，硬體 ${hw} 百萬美元`}>
        <div className="fab" style={{ flex: fab }}>
          晶圓廠 ${fab.toLocaleString()}m
        </div>
        <div className="hw" style={{ flex: hw }}>
          硬體 ${hw.toLocaleString()}m
        </div>
      </div>
      <table className="plain">
        <caption>金額單位：百萬美元</caption>
        <thead>
          <tr>
            <th>受款方</th>
            <th>用途</th>
            <th className="num">金額</th>
          </tr>
        </thead>
        <tbody>
          {CHIPS.map((r) => (
            <tr key={r.name}>
              <td>
                {r.name}
                <div className="track-lbl">{r.track}</div>
              </td>
              <td>{r.use}</td>
              <td className="num">${r.amount.toLocaleString()}m</td>
            </tr>
          ))}
          <tr className="total">
            <td>合計</td>
            <td>9 份意向書</td>
            <td className="num">${total.toLocaleString()}m</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
