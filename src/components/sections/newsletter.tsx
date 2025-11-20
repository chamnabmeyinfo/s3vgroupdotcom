import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function NewsletterSection() {
  return (
    <section className="bg-[#0b3a63] py-14 text-white">
      <Container className="flex flex-col gap-6 rounded-[32px] border border-white/10 bg-white/10 p-8 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/70">
            Updates
          </p>
          <h3 className="mt-2 text-3xl font-semibold">
            Get product drops and deployment guides
          </h3>
          <p className="mt-2 text-sm text-white/80">
            Quarterly digest covering new scales, best practices, and field notes.
          </p>
        </div>
        <form className="flex w-full flex-col gap-3 text-left sm:flex-row lg:max-w-md">
          <input
            type="email"
            placeholder="you@company.com"
            className="h-12 flex-1 rounded-full border border-white/30 bg-white/20 px-4 text-sm text-white placeholder:text-white/70 focus:border-white focus:outline-none"
          />
          <Button type="submit" variant="outline" className="h-12 border-white text-white">
            Subscribe
          </Button>
        </form>
      </Container>
    </section>
  );
}

