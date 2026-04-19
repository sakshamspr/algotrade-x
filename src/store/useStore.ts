import { create } from "zustand";
import type { ChatMessage, Mode } from "@/types";

type PortfolioTab = "holdings" | "positions" | "orders";

interface AppState {
  mode: Mode;
  portfolioTab: PortfolioTab;
  isChatOpen: boolean;
  riskPerTrade: number;
  draftPrompt: string;
  chatMessages: ChatMessage[];
  setMode: (mode: Mode) => void;
  setPortfolioTab: (tab: PortfolioTab) => void;
  toggleChat: () => void;
  openChatWithPrompt: (prompt: string) => void;
  setDraftPrompt: (prompt: string) => void;
  addChatMessage: (message: ChatMessage) => void;
  resetChat: () => void;
  setRiskPerTrade: (value: number) => void;
}

const initialMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Bot X is online. Ask for stock analysis, low-risk allocation ideas, or a breakdown of FnO risk.\n\nThis is AI-generated insight and not financial advice.",
  },
];

export const useAppStore = create<AppState>((set) => ({
  mode: "moderate",
  portfolioTab: "holdings",
  isChatOpen: false,
  riskPerTrade: 2500,
  draftPrompt: "",
  chatMessages: initialMessages,
  setMode: (mode) => set({ mode }),
  setPortfolioTab: (portfolioTab) => set({ portfolioTab }),
  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
  openChatWithPrompt: (draftPrompt) => set({ isChatOpen: true, draftPrompt }),
  setDraftPrompt: (draftPrompt) => set({ draftPrompt }),
  addChatMessage: (message) => set((state) => ({ chatMessages: [...state.chatMessages, message] })),
  resetChat: () => set({ chatMessages: initialMessages }),
  setRiskPerTrade: (riskPerTrade) => set({ riskPerTrade }),
}));
