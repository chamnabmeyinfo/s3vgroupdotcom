import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const session = await auth();
  if (session?.user) {
    redirect("/admin");
  }

  async function handleSignIn(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/admin",
    });
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa] py-16">
      <Container className="max-w-md rounded-3xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#94a3b8]">
            Admin
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-[#0b3a63]">
            Sign in to continue
          </h1>
          <p className="mt-2 text-sm text-[#64748b]">
            Use your admin credentials to access the dashboard.
          </p>
        </div>
        <form action={handleSignIn} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#0b3a63]">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-2xl border border-[#e2e8f0] px-4 py-3 text-sm focus:border-[#0b3a63] focus:outline-none"
              placeholder="admin@s3vtgroup.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#0b3a63]">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full rounded-2xl border border-[#e2e8f0] px-4 py-3 text-sm focus:border-[#0b3a63] focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          {searchParams?.error && (
            <p className="text-sm font-semibold text-[#b42318]">
              Invalid credentials. Please try again.
            </p>
          )}
          <Button type="submit" size="lg" className="w-full">
            Sign in
          </Button>
        </form>
      </Container>
    </div>
  );
}

