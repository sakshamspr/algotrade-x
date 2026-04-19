import { Card } from "@/components/ui/card";
import type { TeamMember } from "@/types";

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="h-48 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.22),_transparent_42%),linear-gradient(180deg,_rgba(248,250,252,0.96),_rgba(226,232,240,0.72))] dark:bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.28),_transparent_42%),linear-gradient(180deg,_rgba(15,23,42,0.92),_rgba(30,41,59,0.72))]">
        {member.image ? (
          <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl font-bold text-primary">
            {member.name
              .split(" ")
              .map((part) => part[0])
              .slice(0, 2)
              .join("")}
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="text-sm text-muted-foreground">Team Member</p>
        <h3 className="mt-1 text-xl font-semibold">{member.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{member.rollNumber}</p>
      </div>
    </Card>
  );
}
