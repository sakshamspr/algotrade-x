import axios from "axios";

const DISCLAIMER = "\n\nThis is AI-generated insight and not financial advice.";

interface GroqMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

const groqClient = axios.create({
  baseURL: "https://api.groq.com/openai/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

const systemPrompt =
  "You are Bot X, a calm fintech assistant for an educational investment platform. " +
  "Give balanced, structured, concise analysis. Highlight pros, cons, and risk level when relevant. " +
  "Never claim certainty and never present content as financial advice.";

export async function getGroqChatCompletion(messages: GroqMessage[]) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    const latestUserMessage = [...messages].reverse().find((message) => message.role === "user")?.content ?? "";
    return (
      [
        "Bot X mock mode is active because `VITE_GROQ_API_KEY` is not set.",
        "",
        `Request received: ${latestUserMessage || "General market guidance"}`,
        "",
        "Pros",
        "- Diversification and staggered entries can reduce decision pressure.",
        "",
        "Cons",
        "- Short-term momentum can reverse quickly.",
        "",
        "Risk level",
        "- Moderate",
      ].join("\n") + DISCLAIMER
    );
  }

  const response = await groqClient.post(
    "/chat/completions",
    {
      model: "llama-3.3-70b-versatile",
      temperature: 0.4,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    },
  );

  const content = response.data?.choices?.[0]?.message?.content?.trim();
  return `${content || "Bot X could not generate a response at the moment."}${DISCLAIMER}`;
}
