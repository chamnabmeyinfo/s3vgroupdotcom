import Link from "next/link";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/quotes", label: "Quotes" },
  { href: "/admin/team", label: "Team" },
  { href: "/admin/portfolio", label: "Portfolio" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/signin");
  }

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/auth/signin" });
  }

  return (
    <div className="flex min-h-screen bg-[#f1f5f9]">
      <aside className="hidden w-64 flex-col border-r border-[#e2e8f0] bg-white px-6 py-8 md:flex">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.5em] text-[#94a3b8]">
            Admin
          </p>
          <h2 className="text-xl font-semibold text-[#0b3a63]">
            S3 V Trading
          </h2>
        </div>
        <nav className="flex flex-1 flex-col gap-2 text-sm font-medium text-[#475467]">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl px-4 py-2 text-[#0b3a63]/80 hover:bg-[#0b3a63]/5"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={handleSignOut}>
          <Button type="submit" variant="ghost" className="w-full justify-start">
            Sign out
          </Button>
        </form>
      </aside>
      <main className="flex-1">
        <div className="border-b border-[#e2e8f0] bg-white px-6 py-4 md:hidden">
          <p className="text-sm font-semibold text-[#0b3a63]">
            Welcome, {session.user.name ?? session.user.email}
          </p>
        </div>
        <div className="p-6 md:p-10">{children}</div>
      </main>
    </div>
  );
}

