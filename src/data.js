/* ============================================================
   資料來源：Q2 2026 量子公司市值營收與虧損（一手申報值，查表日 2026/9/7）
   財務數字為 2026 Q2（截止 6/30）；IQM 為 H1 口徑。
   市值為使用者提供，約 2026/9/4 收盤。

   每一格的結構：
     v     數值（排序與長條用，未揭露填 null；營業虧損存絕對值）
     d     顯示字串
     note  滑過該格時顯示的口徑與時點說明
     flag  'check' 未揭露或推估 · 'period' 期別不同 · 'overlap' 口徑衝突
   ============================================================ */

export const META = {
  period: '2026 Q2',
  updated: '2026-09-07',
  fx: 1.156,
  mcapDate: '2026-09-04',
}

export const AGGREGATE = {
  mcap: 48.0,
  annualRevenue: 436,
  quarterRevenue: 109,
  psRatio: 110,
  disclosedOpLoss: 181.2,
}

export const METRICS = [
  { key: 'mcap', label: '市值', unit: 'US$bn' },
  { key: 'ps', label: '市值／年化營收', unit: '×', tone: 'loss' },
  { key: 'rev', label: '季營收', unit: 'US$m' },
  { key: 'yoy', label: '年增率', unit: '%' },
  { key: 'gm', label: '毛利率', unit: '%' },
  { key: 'opLoss', label: '營業虧損', unit: 'US$m', tone: 'loss' },
  { key: 'lossRatio', label: '虧損／營收', unit: '×', tone: 'loss' },
  { key: 'cash', label: '期末現金', unit: 'US$m' },
  { key: 'rpo', label: '在手訂單', unit: 'US$m' },
]

export const COMPANIES = [
  {
    name: 'IonQ',
    ticker: 'IONQ',
    status: 'Q2 · 上市',
    cells: {
      mcap: { v: 16.0, d: '$16.0b', note: '七家中市值最高，約占合計 $48.0bn 的三分之一。' },
      ps: {
        v: 50.0, d: '50×',
        note: '以 Q2 營收年化 $320.2m 計。全體最低倍數——不是因為便宜，是因為分母比同業大一個量級。',
      },
      rev: {
        v: 80.05, d: '$80.1m',
        note: '占五家 Q2 合計營收 $108.9m 的七成以上。含 SkyWater 併購貢獻。',
      },
      yoy: { v: 287.0, d: '+287%', note: '併購後口徑。有機成長為 +132%，兩個數字要分開講。' },
      gm: { v: null, d: '—', flag: 'check', note: '本表未列示 IonQ 毛利率。' },
      opLoss: {
        v: null, d: '—', flag: 'check',
        note: '本表未填營業虧損，僅有 Adj. EBITDA −$120.3m 與 GAAP 淨損 −$1,867.7m。淨損含約 −$1,600m 非現金認股權證評價，不宜當作營運表現解讀。',
      },
      lossRatio: {
        v: 1.5, d: '1.5×', flag: 'check',
        note: '以 Adj. EBITDA −$120.3m 除以季營收計得，非營業虧損口徑，與 D-Wave、Rigetti 的營業虧損倍數不可直接並列。',
      },
      cash: {
        v: 2960.0, d: '$2,960m',
        note: '七家中最高。SkyWater 於 7/31 交割，交割後 pro-forma 現金約 $2,000m。以 Adj. EBITDA 年化推算約 6.2 年。',
      },
      rpo: {
        v: 485.0, d: '$485m',
        note: 'ASC 606 已簽約未認列金額，一年前為 $122m。覆蓋倍數 1.51×（對年化營收），未含 SkyWater。',
      },
    },
    detail:
      '唯一達到規模的營收，也是唯一倍數落在兩位數的公司。但 GAAP 淨損 −$1,867.7m 幾乎全來自認股權證評價，看損益表要先把非現金項目剝掉。',
  },
  {
    name: 'Quantinuum',
    ticker: 'QNT',
    status: 'Q2 · 2026 IPO',
    cells: {
      mcap: { v: 12.8, d: '$12.8b', note: '市值第二，但年化營收僅 $32.0m，是市值與營收落差最大的一家。' },
      ps: {
        v: 400.0, d: '400×',
        note: '以 Q2 營收年化 $32.0m 計。若改以 H1 年化（$26.4m）計會更高。IPO 時約 450× 2025 年營收的定價延續至今。',
      },
      rev: {
        v: 8.0, d: '$8.0m',
        note: 'Q2 年增 279%，但 H1 合計 $13.2m、YoY −37.5%。單季與半年方向相反，只引用其中一個都會誤導。',
      },
      yoy: {
        v: 279.0, d: '+279%', flag: 'period',
        note: 'Q2 單季數字。H1 為 −37.5%。認列時點跳動所致，建議兩個一起呈現。',
      },
      gm: {
        v: -64.4, d: '(64.4%)', flag: 'overlap',
        note: 'GAAP 口徑為負，調整後為 62%。兩個數字差 126 個百分點，引用時必須註明口徑。',
      },
      opLoss: {
        v: null, d: '—', flag: 'check',
        note: '本表未填營業虧損。GAAP 淨損 −$596.5m 含 −$447.5m IPO 股酬與 −$47.6m 認股權證；調整後淨損為 −$73.1m。',
      },
      lossRatio: {
        v: 8.54, d: '8.5×', flag: 'check',
        note: '以 Adj. EBITDA −$68.3m 除以季營收計得，非營業虧損口徑。',
      },
      cash: { v: 2110.0, d: '$2,110m', note: '以 Adj. EBITDA 年化推算約 7.7 年，七家中最長。' },
      rpo: {
        v: 74.0, d: '$74m',
        note: '覆蓋倍數 2.31×。另揭露 Q2 bookings $4.3m、YTD bookings 約 $81m（含季後 Oracle 案）、FY26 bookings 目標 ≥$120m。',
      },
    },
    detail:
      '史上首宗量子公司傳統 IPO。Q2 +279% 與 H1 −37.5% 並存，加上 GAAP 毛利率 −64.4%／調整後 62% 的落差，是全表口徑陷阱最多的一家。',
  },
  {
    name: 'D-Wave',
    ticker: 'QBTS',
    status: 'Q2 · 上市',
    cells: {
      mcap: { v: 6.2, d: '$6.2b', note: '市值第三，但年化營收僅 $12.4m，倍數為全體最高。' },
      ps: { v: 500.0, d: '500×', note: '以 Q2 營收年化 $12.4m 計，七家中最高。' },
      rev: { v: 3.1, d: '$3.1m', note: '年持平。H1 營收 YoY −67%。' },
      yoy: { v: 0.0, d: '持平', note: '五家中唯一沒有成長的季度。H1 累計為 −67%。' },
      gm: { v: 55.4, d: '55.4%', note: 'GAAP 口徑，七家中最高——訂閱型收入結構的直接反映。' },
      opLoss: { v: 53.3, d: '($53.3m)', note: '營業虧損為季營收的 17.2 倍，全體最高。' },
      lossRatio: {
        v: 17.19, d: '17.2×',
        note: '$53.3m ÷ $3.1m。這是全表最極端的一格：毛利率最高、倍數最高、虧損倍數也最高。',
      },
      cash: { v: 546.2, d: '$546m', note: '以營業虧損年化推算約 2.6 年，與 IQM 並列最短。' },
      rpo: {
        v: 40.7, d: '$40.7m',
        note: 'YoY +668%，覆蓋倍數 3.28×。Q2 bookings $2.1m、H1 bookings $35.5m（YoY +1,120%），H1 含佛羅里達大西洋大學 $20m 整機訂單，尚未認列營收。',
      },
    },
    detail:
      'GAAP 淨損改善至 −$48.0m，但那純粹是認股權證減少 $142m 的會計效果；Adj. EBITDA 實際惡化 85%。淨損改善不等於營運改善，這家是最好的例子。',
  },
  {
    name: 'Rigetti',
    ticker: 'RGTI',
    status: 'Q2 · 上市',
    cells: {
      mcap: { v: 5.1, d: '$5.1b', note: '市值第四。' },
      ps: { v: 248.2, d: '248×', note: '以 Q2 營收年化 $20.6m 計。' },
      rev: { v: 5.138, d: '$5.14m', note: '主要為 Novera QPU 地端銷售，單一客戶佔營收 64%。' },
      yoy: { v: 185.0, d: '+185%', note: '來自專案型整機銷售，非經常性收入。' },
      gm: { v: 43.0, d: '43.0%', note: 'GAAP 口徑。' },
      opLoss: {
        v: 28.1, d: '($28.1m)',
        note: 'R&D $20.7m ＋ SG&A $9.5m。公司無負債。GAAP 淨損 −$52.6m 含 −$29.6m 認股權證評價。',
      },
      lossRatio: { v: 5.47, d: '5.5×', note: '$28.1m ÷ $5.14m。' },
      cash: { v: 541.3, d: '$541m', note: '無負債。以營業虧損年化推算約 4.8 年。' },
      rpo: {
        v: 2.7, d: '$2.7m', flag: 'check',
        note: '覆蓋倍數僅 0.13×，全體最低。其中 $1.1m 於 12 個月後才認列。公司不揭露 bookings 或 backlog。商務部 CHIPS LOI 最高 $100m 為意向書，不是在手訂單，不可計入。',
      },
    },
    detail:
      '在手訂單覆蓋率 0.13× 是全表最需要留意的數字：市值 $5.1bn 對應的已簽約未認列金額只有 $2.7m。無負債與 $541m 現金給了時間，但訂單能見度是最弱的。',
  },
  {
    name: 'Xanadu',
    ticker: 'XNDU',
    status: '無申報義務',
    cells: {
      mcap: {
        v: 3.0, d: '$3.0b',
        note: 'SPAC 合併尚未完成，無公開財務申報義務（Pasqal 情況相同）。市值存在，但沒有任何可查核的財務數字對應。',
      },
      ps: { v: null, d: '—', flag: 'check', note: '無營收揭露，無法計算。' },
      rev: { v: null, d: '—', flag: 'check', note: 'SPAC 合併未完成，無公開申報。' },
      yoy: { v: null, d: '—', flag: 'check', note: '同上。' },
      gm: { v: null, d: '—', flag: 'check', note: '同上。' },
      opLoss: { v: null, d: '—', flag: 'check', note: '同上。' },
      lossRatio: { v: null, d: '—', flag: 'check', note: '同上。' },
      cash: { v: null, d: '—', flag: 'check', note: '同上。' },
      rpo: { v: null, d: '—', flag: 'check', note: '未申報。' },
    },
    detail:
      '市值 $3.0bn 排第五，但完全沒有公開財務申報。放進表裡是為了說明一件事：這個產業的市值有一部分並不對應任何可查核的數字。',
  },
  {
    name: 'Infleqtion',
    ticker: 'INFQ',
    status: 'Q2 · 2026-06 IPO',
    cells: {
      mcap: { v: 2.85, d: '$2.85b', note: '市值第六，但年化營收 $50.5m 為第二高。' },
      ps: {
        v: 56.4, d: '56×',
        note: '以 Q2 營收年化 $50.5m 計，僅次於 IonQ 的 50×，是全表倍數第二低的一家。',
      },
      rev: {
        v: 12.633, d: '$12.6m', flag: 'check',
        note: '營收 100% 有機、公司無負債。8-K/A 更正後為 $13.5m，本表仍採初版 $12.6m；FY26 指引同步由 $43m 改為 $45.1m。引用前確認採用哪一版。',
      },
      yoy: { v: 116.0, d: '+116%', note: '全為有機成長，未含併購。' },
      gm: { v: 11.0, d: '11.0%', note: 'GAAP 口徑，七家中最低。' },
      opLoss: { v: 29.9, d: '($29.9m)', flag: 'check', note: '8-K/A 更新後數字，初版為 −$30.6m。' },
      lossRatio: { v: 2.37, d: '2.4×', note: '$29.9m ÷ $12.6m，全表最低。' },
      cash: {
        v: 582.0, d: '$582m',
        note: '含 $27.4m 暫時性薪資稅，Q3 需繳出，實質約 $555m。以營業虧損年化推算約 4.9 年。',
      },
      rpo: {
        v: null, d: '未揭露', flag: 'check',
        note: 'Q2 財報未揭露 bookings／backlog／RPO。可參考項目：合約負債 $2.5m；已簽約之伊利諾州 2027 系統；商務部 LOI 最高 $100m（意向書，非訂單）。',
      },
    },
    detail:
      '虧損倍數 2.4× 為全表最低、營收 100% 有機、無負債，但毛利率只有 11.0%，且完全不揭露訂單指標。基本面最紮實與能見度最低同時出現在同一家。',
  },
  {
    name: 'IQM',
    ticker: 'IQMX',
    status: 'H1 · 2026-07 Nasdaq',
    cells: {
      mcap: { v: 2.05, d: '$2.05b', note: '七家中市值最低。' },
      ps: {
        v: 99.6, d: '100×', flag: 'period',
        note: '以 H1 營收 ×2 年化為 $20.6m 計。年化基礎與其他公司的 Q2×4 不同，僅供相對觀察。',
      },
      rev: {
        v: 10.288, d: '$10.3m', flag: 'period',
        note: `H1 口徑，原始為 €8.9m，依 EUR/USD ${META.fx} 換算。與其他公司的 Q2 數字不可直接比較。`,
      },
      yoy: { v: null, d: '—', flag: 'check', note: '本表未提供可比的年增率。已知 FY26 指引為 €42–47m。' },
      gm: { v: null, d: '—', flag: 'check', note: '未揭露。' },
      opLoss: {
        v: 69.9, d: '($69.9m)', flag: 'period',
        note: 'H1 口徑，原始為 −€60.5m。絕對金額為七家中最高，但涵蓋兩季，與他家單季數字不可並列。',
      },
      lossRatio: {
        v: 6.79, d: '6.8×', flag: 'period',
        note: 'H1 虧損 ÷ H1 營收，分子分母同期，倍數本身可比。',
      },
      cash: {
        v: 358.0, d: '$358m',
        note: '原始 €309.4m（7/2）。公司稱可支撐至 2028 Q2；以 H1 虧損年化推算約 2.6 年，與該說法一致。',
      },
      rpo: {
        v: 118.03, d: '$118m',
        note: '訂單簿 8/3 為 €102.1m（6/30 為 €69.1m，其後新增 €33.0m）。IFRS 下自訂口徑，與 ASC 606 的 RPO 不同定義。覆蓋倍數 5.74×，全體最高。',
      },
    },
    detail:
      '訂單覆蓋 5.74× 為全體最高，累計 26 台全端系統已售、17 台已交付，6 月首度交付美國能源部 Oak Ridge 國家實驗室。所有財務數字為 H1 口徑。',
  },
]

export const CHIPS = [
  { name: 'IBM', amount: 1000, use: '成立 Anderon，紐約 Albany 的 300mm 量子晶圓廠子公司', track: '晶圓廠' },
  { name: 'GlobalFoundries', amount: 375, use: '成立 Quantum Technology Solutions，多模態安全量子晶圓廠', track: '晶圓廠' },
  { name: 'PsiQuantum', amount: 100, use: '光子', track: '硬體' },
  { name: 'Quantinuum', amount: 100, use: '離子阱', track: '硬體' },
  { name: 'D-Wave', amount: 100, use: '超導／退火', track: '硬體' },
  { name: 'Rigetti', amount: 100, use: '超導；微型化讀出電子元件、次世代低溫恆溫器', track: '硬體' },
  { name: 'Infleqtion', amount: 100, use: '中性原子', track: '硬體' },
  { name: 'Atom Computing', amount: 100, use: '中性原子', track: '硬體' },
  { name: 'Diraq', amount: 38, use: '矽自旋', track: '硬體' },
]

export const MARKET = [
  { n: '$1.9bn', p: 'QED-C 統計 2025 年全球量子市場規模，其中量子運算 $1.4bn、量子感測 $0.47bn。' },
  { n: '$4.4bn', p: 'McKinsey 估計 2028 年量子運算公司合計營收；2025 年為超過 $1bn。' },
  { n: '$2.013bn', p: 'CHIPS Act 5 月一次簽署 9 份意向書的總額，單筆跨年度承諾即超過全球市場一整年營收。' },
]

export const FLAG_TYPES = {
  check: { label: '未揭露或推估', desc: '公司未揭露、本表未填，或由其他指標推算而得。' },
  period: { label: '期別不同', desc: 'IQM 為 H1 口徑，或該數字取自其他期間，與 Q2 不可直接比較。' },
  overlap: { label: '口徑衝突', desc: 'GAAP 與調整後數字差距顯著，引用時必須註明採用哪一種。' },
}

export const OPEN_ITEMS = [
  {
    t: '合計營業虧損 $300m 無法從本表重建',
    d: '有揭露營業虧損的只有四家，合計 $181.2m（D-Wave $53.3m、Rigetti $28.1m、Infleqtion $29.9m、IQM $69.9m，後者為 H1）。IonQ 與 Quantinuum 只填了 Adj. EBITDA 與 GAAP 淨損。要沿用 $300m 這個數字，得先從 10-Q 補上這兩家的營業虧損，並說明 IQM 的 H1 如何併入。',
  },
  {
    t: '「排除 IonQ 後其餘四家為 6 倍以上」這句話要刪掉',
    d: '以本表實際數字驗算，Rigetti 為 5.5×、Infleqtion 為 2.4×，都在 6 倍以下，原始說法不成立。可改為：虧損倍數區間 2.4×–17.2×，D-Wave 為極端值。',
  },
  {
    t: '三個虧損倍數口徑混在同一欄',
    d: 'D-Wave、Rigetti、Infleqtion 用營業虧損，IonQ 與 Quantinuum 用 Adj. EBITDA，IQM 用 H1 對 H1。同欄排序看得出相對高低，但不能寫成「六家的營業虧損倍數」。若要進正式文件，建議拆成兩欄或全部統一到營業虧損。',
  },
  {
    t: 'Infleqtion 有 8-K/A 更正版',
    d: '營收 $12.6m→$13.5m、FY26 指引 $43m→$45.1m、營業虧損 −$30.6m→−$29.9m。本表營收採初版、營業虧損採更正版，兩欄不同版本，送出前要統一，否則虧損倍數會對不上。',
  },
  {
    t: '市值非申報值',
    d: `市值為使用者提供的約 ${META.mcapDate} 收盤價，與財務數字的 6/30 截止日相差兩個多月。所有市值倍數都建立在這個時間差上，簡報時要標明取價日。`,
  },
  {
    t: '毛利率口徑不一致',
    d: 'Quantinuum GAAP 為 −64.4%、調整後為 62%，差 126 個百分點。D-Wave、Rigetti、Infleqtion 為 GAAP，IonQ 未列示。跨公司比較毛利率前必須先對齊口徑。',
  },
  {
    t: '大廠與未申報公司無法納入分析',
    d: 'IBM、Google、Microsoft、AWS、Fujitsu 都不單獨揭露量子營收，市占率無從計算。Xanadu 與 Pasqal 的 SPAC 合併尚未完成，有市值但無財務申報。',
  },
]

export const SOURCES = [
  { co: 'IonQ', doc: 'Q2 2026 新聞稿（2026/8/5）', type: '公司新聞稿' },
  { co: 'Quantinuum', doc: 'Q2 2026 8-K EX-99.1（2026/8/11）、法說會逐字稿', type: 'SEC 8-K ＋ 逐字稿' },
  { co: 'D-Wave', doc: 'Q2 2026 8-K EX-99.1（2026/8/6）', type: 'SEC 8-K EX-99.1' },
  { co: 'Rigetti', doc: 'Q2 2026 財報簡報（2026/8/6）、10-Q', type: '公司簡報 ＋ SEC 10-Q' },
  { co: 'Infleqtion', doc: 'Q2 2026 新聞稿（2026/8/12）、8-K/A 更正（2026/8/17）', type: '新聞稿 ＋ SEC 8-K/A' },
  { co: 'IQM', doc: 'H1 2026 半年報（2026/8/4）', type: '半年報／交易所公告' },
]
