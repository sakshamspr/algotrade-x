import type {
  Buyback,
  Fund,
  HistoryPoint,
  Ipo,
  NewsItem,
  PortfolioRow,
  SectorInsight,
  Stock,
  TickerItem,
  TeamMember,
  TradeIdea,
} from "@/types";

export const tickerItems: TickerItem[] = [
  { symbol: "NIFTY 50", name: "NIFTY 50", price: 22431.4, change: 0.82 },
  { symbol: "SENSEX", name: "SENSEX", price: 73841.9, change: 0.56 },
  { symbol: "RELIANCE", name: "Reliance", price: 2892.55, change: 1.41 },
  { symbol: "TCS", name: "TCS", price: 4138.4, change: -0.52 },
  { symbol: "HDFCBANK", name: "HDFC Bank", price: 1689.3, change: 0.77 },
  { symbol: "INFY", name: "Infosys", price: 1481.85, change: 1.12 },
];

export const newsItems: NewsItem[] = [
  {
    id: "n1",
    title: "NIFTY firms up as capital goods and private banks lead early gains",
    source: "Market Pulse",
    time: "2m ago",
    category: "Markets",
  },
  {
    id: "n2",
    title: "New IPO pipeline stays active as mid-cap demand remains steady",
    source: "Primary Desk",
    time: "12m ago",
    category: "IPO",
  },
  {
    id: "n3",
    title: "Brokerages stay selective on IT amid mixed global spending commentary",
    source: "Street Wire",
    time: "21m ago",
    category: "Stocks",
  },
];

export const ipos: Ipo[] = [
  {
    id: "zenith-power",
    company: "Zenith Power Grid",
    sector: "Infrastructure",
    lotSize: 42,
    minInvestment: 14784,
    expectedProfit: 18.2,
    openDate: "22 Apr 2026",
    closeDate: "25 Apr 2026",
    listingDate: "30 Apr 2026",
    revenue: "Rs 1,842 Cr",
    profit: "Rs 266 Cr",
    description:
      "Zenith Power Grid builds transmission infrastructure and grid balancing solutions for industrial power corridors.",
    strengths: ["Stable cash flows", "Government order book", "Low debt profile"],
  },
  {
    id: "aether-health",
    company: "Aether Health Labs",
    sector: "Healthcare",
    lotSize: 28,
    minInvestment: 13440,
    expectedProfit: 13.6,
    openDate: "01 May 2026",
    closeDate: "05 May 2026",
    listingDate: "10 May 2026",
    revenue: "Rs 628 Cr",
    profit: "Rs 88 Cr",
    description:
      "Aether Health Labs operates diagnostic centers and AI-led pathology workflows across tier-1 and tier-2 cities.",
    strengths: ["Asset-light expansion", "Strong margins", "Repeat customer base"],
  },
  {
    id: "nova-logistics",
    company: "Nova Logistics Tech",
    sector: "Logistics",
    lotSize: 36,
    minInvestment: 16200,
    expectedProfit: 11.4,
    openDate: "06 May 2026",
    closeDate: "09 May 2026",
    listingDate: "15 May 2026",
    revenue: "Rs 2,113 Cr",
    profit: "Rs 141 Cr",
    description:
      "Nova offers warehousing automation and freight intelligence software for enterprise supply chains.",
    strengths: ["Sticky enterprise clients", "Strong technology moat", "Expanding exports"],
  },
];

export const buybacks: Buyback[] = [
  { id: "bb-1", company: "Infosys", size: "Rs 9,300 Cr", openDate: "20 Apr 2026", closeDate: "03 May 2026", price: 1580 },
  { id: "bb-2", company: "Wipro", size: "Rs 6,000 Cr", openDate: "24 Apr 2026", closeDate: "05 May 2026", price: 525 },
  { id: "bb-3", company: "Mindtree Digital", size: "Rs 2,450 Cr", openDate: "01 May 2026", closeDate: "12 May 2026", price: 3710 },
];

export const funds: Fund[] = [
  {
    id: "nifty-bees",
    name: "Nippon India Nifty ETF",
    type: "ETF",
    oneYearReturn: 17.8,
    risk: "Moderate",
    category: "Large Cap Index",
    manager: "Sailesh Raj Bhan",
    exitLoad: "Nil",
    cagr: { oneYear: 17.8, threeYear: 14.1, fiveYear: 15.9 },
  },
  {
    id: "flexi-alpha",
    name: "Axis Flexi Alpha Fund",
    type: "Mutual Fund",
    oneYearReturn: 15.3,
    risk: "Moderate",
    category: "Flexi Cap",
    manager: "Jinesh Gopani",
    exitLoad: "1% within 12 months",
    cagr: { oneYear: 15.3, threeYear: 16.8, fiveYear: 18.2 },
  },
  {
    id: "smallcap-surge",
    name: "Mirae Emerging Leaders Fund",
    type: "Mutual Fund",
    oneYearReturn: 21.2,
    risk: "High",
    category: "Small Cap",
    manager: "Ankit Jain",
    exitLoad: "1% within 365 days",
    cagr: { oneYear: 21.2, threeYear: 24.2, fiveYear: 19.4 },
  },
];

export const stocks: Stock[] = [
  {
    id: "reliance",
    name: "Reliance Industries",
    symbol: "RELIANCE",
    buyLevel: 2860,
    sellLevel: 3015,
    peRatio: 24.4,
    high52w: 3120,
    low52w: 2380,
    sector: "Energy",
    marketCap: "Rs 19.4L Cr",
    summary: "Diversified energy and retail leader with steady cash generation and telecom optionality.",
    history: [
      { month: "Jan", price: 2530 },
      { month: "Feb", price: 2595 },
      { month: "Mar", price: 2684 },
      { month: "Apr", price: 2620 },
      { month: "May", price: 2714 },
      { month: "Jun", price: 2781 },
      { month: "Jul", price: 2812 },
      { month: "Aug", price: 2893 },
    ],
  },
  {
    id: "hdfc-bank",
    name: "HDFC Bank",
    symbol: "HDFCBANK",
    buyLevel: 1655,
    sellLevel: 1742,
    peRatio: 19.1,
    high52w: 1794,
    low52w: 1415,
    sector: "Banking",
    marketCap: "Rs 12.7L Cr",
    summary: "Private banking heavyweight with improving deposit franchise and stable retail book quality.",
    history: [
      { month: "Jan", price: 1491 },
      { month: "Feb", price: 1513 },
      { month: "Mar", price: 1540 },
      { month: "Apr", price: 1584 },
      { month: "May", price: 1608 },
      { month: "Jun", price: 1641 },
      { month: "Jul", price: 1678 },
      { month: "Aug", price: 1689 },
    ],
  },
  {
    id: "infosys",
    name: "Infosys",
    symbol: "INFY",
    buyLevel: 1450,
    sellLevel: 1532,
    peRatio: 28.8,
    high52w: 1678,
    low52w: 1289,
    sector: "IT",
    marketCap: "Rs 6.1L Cr",
    summary: "Global IT services company with disciplined capital allocation and resilient digital transformation demand.",
    history: [
      { month: "Jan", price: 1335 },
      { month: "Feb", price: 1362 },
      { month: "Mar", price: 1398 },
      { month: "Apr", price: 1411 },
      { month: "May", price: 1446 },
      { month: "Jun", price: 1464 },
      { month: "Jul", price: 1470 },
      { month: "Aug", price: 1482 },
    ],
  },
];

const makeHistory = (start: number, drift: number, length: number): HistoryPoint[] =>
  Array.from({ length }).map((_, index) => ({
    time: `${index + 1}`,
    value: Number((start + drift * index + Math.sin(index / 2) * drift * 0.75).toFixed(2)),
  }));

export const stockHistoryMap: Record<string, Record<"1D" | "1W" | "1M" | "1Y", HistoryPoint[]>> = {
  RELIANCE: {
    "1D": makeHistory(2862, 2.4, 28),
    "1W": makeHistory(2810, 6.8, 20),
    "1M": makeHistory(2720, 7.2, 24),
    "1Y": makeHistory(2330, 24, 32),
  },
  HDFCBANK: {
    "1D": makeHistory(1660, 1.2, 28),
    "1W": makeHistory(1624, 2.8, 20),
    "1M": makeHistory(1570, 4.2, 24),
    "1Y": makeHistory(1418, 8.5, 32),
  },
  INFY: {
    "1D": makeHistory(1452, 1.1, 28),
    "1W": makeHistory(1426, 2.1, 20),
    "1M": makeHistory(1394, 3.6, 24),
    "1Y": makeHistory(1288, 6.9, 32),
  },
};

export const sectors: SectorInsight[] = [
  { name: "Capital Goods", performance: 2.8, sentiment: "Order inflows remain robust across rail and power." },
  { name: "FMCG", performance: -1.1, sentiment: "Input inflation and slower rural demand are pressuring margins." },
];

export const trades: TradeIdea[] = [
  { id: "tr-1", type: "Intraday", symbol: "SBIN", entry: 822, stopLoss: 812, target: 839, pnl: 3420 },
  { id: "tr-2", type: "Intraday", symbol: "ICICIBANK", entry: 1184, stopLoss: 1172, target: 1210, pnl: -980 },
  { id: "tr-3", type: "FnO", symbol: "NIFTY 22600 CE", entry: 184, stopLoss: 152, target: 238, pnl: 4520 },
  { id: "tr-4", type: "FnO", symbol: "BANKNIFTY 48700 PE", entry: 236, stopLoss: 208, target: 288, pnl: -1330 },
];

export const holdings: PortfolioRow[] = [
  { id: "h1", instrument: "Reliance Industries", quantity: "18", value: "Rs 52,074", status: "Long term" },
  { id: "h2", instrument: "Nippon India Nifty ETF", quantity: "120", value: "Rs 31,680", status: "SIP" },
  { id: "h3", instrument: "Axis Flexi Alpha Fund", quantity: "74", value: "Rs 22,710", status: "Core" },
];

export const positions: PortfolioRow[] = [
  { id: "p1", instrument: "SBIN Intraday", quantity: "400", value: "Rs 3,420", status: "Open" },
  { id: "p2", instrument: "NIFTY 22600 CE", quantity: "150", value: "Rs 4,520", status: "Running" },
];

export const orders: PortfolioRow[] = [
  { id: "o1", instrument: "Nova Logistics Tech IPO", quantity: "1 lot", value: "Pending UPI", status: "Placed" },
  { id: "o2", instrument: "HDFCBANK CNC", quantity: "12", value: "Rs 20,271", status: "Executed" },
];

export const teamMembers: TeamMember[] = [
  { id: "tm1", name: "Saksham Sapra", rollNumber: "23/IT/147" },
  { id: "tm2", name: "Saksham Aggarwal", rollNumber: "23/IT/145" },
  { id: "tm3", name: "Rishit Bansal", rollNumber: "23/IT/133" },
  { id: "tm4", name: "Yash Kalra", rollNumber: "23/IT/178" },
  { id: "tm5", name: "Sumay Mittal", rollNumber: "23/IT/163" },
];
