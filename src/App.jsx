import ScaleBar from './components/ScaleBar.jsx'
import MetricGrid from './components/MetricGrid.jsx'
import ChipsTable from './components/ChipsTable.jsx'
import { META, MARKET, OPEN_ITEMS, COMPANIES, AGGREGATE, SOURCES } from './data.js'

export default function App() {
  return (
    <>
      <header className="masthead">
        <div className="wrap">
          <div className="title">量子產業財務儀表板</div>
          <div className="meta">
            資料期間 {META.period}　·　更新 {META.updated}
          </div>
        </div>
      </header>

      <div className="hero">
        <div className="wrap">
          <h1>市值 $48bn，年化營收 $436m</h1>
          <p className="lede">
            七家量子公司合計市值，對五家有申報的 2026 Q2 營收年化值——110 倍。這個倍數反映的不是現金流，而是市場對容錯量子電腦落地時程的定價。
          </p>
          <ScaleBar />
          <div className="readouts">
            <div className="readout">
              <span className="n">110×</span>
              <span className="k">合計市值／合計年化營收</span>
            </div>
            <div className="readout">
              <span className="n">500×</span>
              <span className="k">D-Wave，全體最高的市值倍數</span>
            </div>
            <div className="readout">
              <span className="n">50×</span>
              <span className="k">IonQ，全體最低——分母大一個量級</span>
            </div>
            <div className="readout">
              <span className="n">2.4–17.2×</span>
              <span className="k">虧損／營收的實際區間，四家已揭露</span>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap">
        <section className="block">
          <h2>逐家逐項</h2>
          <p className="intro">
            九個指標、七家公司。滑過或用鍵盤 Tab 到任一格，下方會顯示該數字的口徑、時點與計算方式。點欄位標題可排序。
          </p>
          <MetricGrid />
        </section>

        <section className="block">
          <h2>各家動能來源</h2>
          <p className="intro">
            每一家的財務結構都有一個需要單獨解釋的地方——非現金項目、口徑落差、或訂單能見度。
          </p>
          <div className="panel">
            <table className="plain">
              <thead>
                <tr>
                  <th>公司</th>
                  <th>Q2 2026 營收動能</th>
                </tr>
              </thead>
              <tbody>
                {COMPANIES.map((c) => (
                  <tr key={c.name}>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      {c.name}
                      <div className="track-lbl">{c.status}</div>
                    </td>
                    <td>{c.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="block">
          <h2>市場規模對照</h2>
          <p className="intro">政策承諾的量級已經超過整個市場的年營收，這是判斷估值時繞不開的分母問題。</p>
          <div className="cards">
            {MARKET.map((m) => (
              <div className="card" key={m.n}>
                <span className="n">{m.n}</span>
                <p>{m.p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="block">
          <h2>CHIPS Act 量子意向書分配</h2>
          <p className="intro">
            2026 年 5 月美國商務部一次簽署 9 份意向書，分為 2 家量子晶圓廠與 7 家量子運算公司。IBM、Microsoft、Google 的量子業務不揭露獨立損益，這份分配是目前最接近的投入強度參考。
          </p>
          <ChipsTable />
        </section>

        <section className="block">
          <h2>資本市場窗口</h2>
          <p className="intro">
            2026 上半年新增五家量子上市公司。Quantinuum 以約 450 倍 2025 年營收的估值倍數完成史上首宗量子公司傳統 IPO，反映的是融資窗口與風險偏好，而非基本面轉折。
          </p>
          <div className="panel">
            <table className="plain">
              <thead>
                <tr>
                  <th>公司</th>
                  <th>事件</th>
                  <th className="num">關鍵數字</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Quantinuum</td>
                  <td>傳統 IPO，量子產業首宗</td>
                  <td className="num">≈450× 2025 營收</td>
                </tr>
                <tr>
                  <td>Infleqtion</td>
                  <td>6 月完成 IPO</td>
                  <td className="num">募資 $1.7bn</td>
                </tr>
                <tr>
                  <td>IQM</td>
                  <td>7 月 Nasdaq 上市</td>
                  <td className="num">在手訂單 &gt; €102.1m</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="block">
          <div className="flags">
            <h3>提交前要處理的資料點</h3>
            <ul>
              {OPEN_ITEMS.map((o) => (
                <li key={o.t}>
                  <strong>{o.t}</strong>
                  {o.d}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <footer>
        <div className="wrap">
          <p>
            財務數字為 2026 Q2（截止 6/30）申報值，IQM 為 H1 口徑，原始歐元金額依 EUR/USD {META.fx} 換算。市值為使用者提供，約 {META.mcapDate} 收盤，與財務截止日相差兩個多月。年化營收為 Q2×4（IQM 為 H1×2）。
          </p>
          <p>一手來源：{SOURCES.map((s) => `${s.co}（${s.type}）`).join('、')}。</p>
          <p>
            所有數字集中在 <code>src/data.js</code>，改一處即可更新全頁。
          </p>
        </div>
      </footer>
    </>
  )
}
