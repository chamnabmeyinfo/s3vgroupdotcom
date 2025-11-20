import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import { getPrismaClient } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

async function getTeamMembers() {
  const prisma = await getPrismaClient();
  if (!prisma) return [];
  return prisma.teamMember.findMany({
    orderBy: { priority: "desc" },
  });
}

export default async function TeamPage() {
  const session = await auth();
  if (!session) redirect("/auth/signin");

  const members = await getTeamMembers();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#0b3a63]">Team</h1>
          <p className="text-sm text-[#475467]">
            Manage team members ({members.length} total)
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/team/new">+ Add Member</Link>
        </Button>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {members.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
                    No team members yet. Add your first member.
                  </td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {member.photo && (
                          <Image
                            src={member.photo}
                            alt={member.name}
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        )}
                        <p className="font-medium text-[#0b3a63]">{member.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {member.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {member.email || member.phone || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {member.priority}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={member.status === "ACTIVE" ? "success" : "secondary"}>
                        {member.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/team/${member.id}`}
                        className="text-sm font-medium text-[#0b3a63] hover:text-[#ff8a00]"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
