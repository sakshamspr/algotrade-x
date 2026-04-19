export type Mode = "low" | "moderate" | "high";

export interface TickerItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  category: string;
}

export interface Ipo {
  id: string;
  company: string;
  sector: string;
  lotSize: number;
  minInvestment: number;
  expectedProfit: number;
  openDate: string;
  closeDate: string;
  listingDate: string;
  revenue: string;
  profit: string;
  description: string;
  strengths: string[];
}

export interface Buyback {
  id: string;
  company: string;
  size: string;
  openDate: string;
  closeDate: string;
  price: number;
}

export interface Fund {
  id: string;
  name: string;
  type: "ETF" | "Mutual Fund";
  oneYearReturn: number;
  risk: "Low" | "Moderate" | "High";
  category: string;
  manager: string;
  exitLoad: string;
  cagr: {
    oneYear: number;
    threeYear: number;
    fiveYear: number;
  };
}

export interface StockPoint {
  month: string;
  price: number;
}

export interface HistoryPoint {
  time: string;
  value: number;
}

export interface Stock {
  id: string;
  name: string;
  symbol: string;
  buyLevel: number;
  sellLevel: number;
  peRatio: number;
  high52w: number;
  low52w: number;
  sector: string;
  marketCap: string;
  summary: string;
  history: StockPoint[];
}

export interface TeamMember {
  id: string;
  name: string;
  rollNumber: string;
  image?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface SectorInsight {
  name: string;
  performance: number;
  sentiment: string;
}

export interface TradeIdea {
  id: string;
  type: "Intraday" | "FnO";
  symbol: string;
  entry: number;
  stopLoss: number;
  target: number;
  pnl: number;
}

export interface PortfolioRow {
  id: string;
  instrument: string;
  quantity: string;
  value: string;
  status: string;
}
