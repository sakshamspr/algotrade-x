import axios from "axios";
import {
  buybacks,
  funds,
  ipos,
  newsItems,
  sectors,
  stockHistoryMap,
  stocks,
  tickerItems,
  trades,
} from "@/data/mock";

const api = axios.create({
  baseURL: "/api",
  timeout: 1000,
});

const wait = async <T,>(data: T, delay = 500): Promise<T> =>
  new Promise((resolve) => {
    window.setTimeout(() => resolve(data), delay);
  });

export const marketApi = {
  ticker: async () => {
    await api.get("/market/ticker").catch(() => null);
    return wait(tickerItems, 350);
  },
  ipos: async () => {
    await api.get("/ipos").catch(() => null);
    return wait(ipos, 500);
  },
  ipoById: async (id: string) => {
    await api.get(`/ipos/${id}`).catch(() => null);
    return wait(ipos.find((item) => item.id === id) ?? null, 300);
  },
  buybacks: async () => {
    await api.get("/buybacks").catch(() => null);
    return wait(buybacks, 450);
  },
  funds: async () => {
    await api.get("/funds").catch(() => null);
    return wait(funds, 450);
  },
  fundById: async (id: string) => {
    await api.get(`/funds/${id}`).catch(() => null);
    return wait(funds.find((item) => item.id === id) ?? null, 300);
  },
  stocks: async () => {
    await api.get("/stocks").catch(() => null);
    return wait(stocks, 500);
  },
  stockById: async (id: string) => {
    await api.get(`/stocks/${id}`).catch(() => null);
    return wait(stocks.find((item) => item.id === id) ?? null, 350);
  },
  sectors: async () => {
    await api.get("/sectors").catch(() => null);
    return wait(sectors, 300);
  },
  news: async () => {
    await api.get("/news").catch(() => null);
    return wait(newsItems, 280);
  },
  trades: async () => {
    await api.get("/trades").catch(() => null);
    return wait(trades, 350);
  },
  stockHistory: async (symbol: string, timeframe: "1D" | "1W" | "1M" | "1Y") => {
    await api.get(`/stocks/${symbol}/history`, { params: { timeframe } }).catch(() => null);
    return wait(stockHistoryMap[symbol]?.[timeframe] ?? [], 400);
  },
  analyze: async (prompt: string) => {
    await api.post("/ai/analyze", { prompt }).catch(() => null);
    return wait(
      {
        message:
          prompt.length > 10
            ? "Bot X sees a balanced setup. Prefer position sizing, staggered entry, and strict exits before acting."
            : "Bot X is ready. Ask about a stock, fund, IPO, or trade setup.",
      },
      700,
    );
  },
};
