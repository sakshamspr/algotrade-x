import { useParams } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/ui/card";
import { useAsyncData } from "@/hooks/useAsyncData";
import { marketApi } from "@/services/api";

export function FundDetail() {
  const { id = "" } = useParams();
  const { data } = useAsyncData(() => marketApi.fundById(id), [id]);

  if (!data) {
    return <div className="rounded-3xl bg-muted p-8">Fund details not found.</div>;
  }

  return (
    <PageTransition>
      <SectionHeader
        eyebrow={data.type}
        title={data.name}
        description={`Managed by ${data.manager}. Category: ${data.category}.`}
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">1Y CAGR</p>
          <p className="mt-2 text-3xl font-bold text-secondary">{data.cagr.oneYear}%</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">3Y CAGR</p>
          <p className="mt-2 text-3xl font-bold">{data.cagr.threeYear}%</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">5Y CAGR</p>
          <p className="mt-2 text-3xl font-bold">{data.cagr.fiveYear}%</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Exit Load</p>
          <p className="mt-2 text-xl font-semibold">{data.exitLoad}</p>
        </Card>
      </div>
    </PageTransition>
  );
}
