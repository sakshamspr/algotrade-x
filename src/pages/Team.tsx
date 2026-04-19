import { teamMembers } from "@/data/mock";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeader } from "@/components/SectionHeader";
import { TeamCard } from "@/components/TeamCard";

export function Team() {
  return (
    <PageTransition>
      <SectionHeader
        eyebrow="Our Team"
        title="People behind Algotrade X"
        description="Dynamic cards are ready for real member photos whenever you plug them in."
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {teamMembers.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>
    </PageTransition>
  );
}
