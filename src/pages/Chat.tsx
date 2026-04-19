import { ChatPanel } from "@/components/ChatPanel";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/ui/card";

export function Chat() {
  return (
    <PageTransition>
      <SectionHeader
        eyebrow="AI Assistant"
        title="Bot X Dedicated Chat"
        description="Use Groq-powered prompts for stock analysis, investment suggestions, and risk explanations."
      />

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <ChatPanel embedded />
        <Card className="h-fit p-6">
          <p className="text-sm uppercase tracking-[0.22em] text-primary">Integration Notes</p>
          <h3 className="mt-3 text-2xl font-semibold">API-ready architecture</h3>
          <div className="mt-5 grid gap-4 text-sm leading-7 text-muted-foreground">
            <p>
              Endpoint:
              <span className="ml-2 rounded-full bg-muted px-3 py-1 font-medium text-foreground">
                POST https://api.groq.com/openai/v1/chat/completions
              </span>
            </p>
            <p>
              Env:
              <span className="ml-2 rounded-full bg-muted px-3 py-1 font-medium text-foreground">
                VITE_GROQ_API_KEY=your_api_key_here
              </span>
            </p>
            <p>
              Every assistant response ends with the required disclaimer so the UX stays responsible even when the
              model output is optimistic.
            </p>
          </div>
        </Card>
      </div>
    </PageTransition>
  );
}
