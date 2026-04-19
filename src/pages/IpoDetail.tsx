import { useParams } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/ui/card";
import { useAsyncData } from "@/hooks/useAsyncData";
import { marketApi } from "@/services/api";

export function IpoDetail() {
  const { id = "" } = useParams();
  const { data } = useAsyncData(() => marketApi.ipoById(id), [id]);

  if (!data) {
    return <div className="rounded-3xl bg-muted p-8">IPO details not found.</div>;
  }

  return (
    <PageTransition>
      <SectionHeader
        eyebrow="IPO Detail"
        title={data.company}
        description={data.description}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <Card className="p-6">
          <h3 className="text-xl font-semibold">Issue Timeline</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-muted/60 p-4">
              <p className="text-sm text-muted-foreground">Open Date</p>
              <p className="mt-1 font-semibold">{data.openDate}</p>
            </div>
            <div className="rounded-2xl bg-muted/60 p-4">
              <p className="text-sm text-muted-foreground">Close Date</p>
              <p className="mt-1 font-semibold">{data.closeDate}</p>
            </div>
            <div className="rounded-2xl bg-muted/60 p-4">
              <p className="text-sm text-muted-foreground">Listing Date</p>
              <p className="mt-1 font-semibold">{data.listingDate}</p>
            </div>
          </div>

          <h3 className="mt-8 text-xl font-semibold">Financials</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-primary/10 p-4">
              <p className="text-sm text-muted-foreground">Revenue</p>
              <p className="mt-1 text-xl font-semibold">{data.revenue}</p>
            </div>
            <div className="rounded-2xl bg-secondary/10 p-4">
              <p className="text-sm text-muted-foreground">Profit</p>
              <p className="mt-1 text-xl font-semibold">{data.profit}</p>
            </div>
            <div className="rounded-2xl bg-muted/60 p-4">
              <p className="text-sm text-muted-foreground">Min Investment</p>
              <p className="mt-1 text-xl font-semibold">Rs {data.minInvestment.toLocaleString("en-IN")}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold">Why it stands out</h3>
          <div className="mt-5 grid gap-3">
            {data.strengths.map((item) => (
              <div key={item} className="rounded-2xl bg-muted/60 p-4">
                <p className="font-medium">{item}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageTransition>
  );
}
