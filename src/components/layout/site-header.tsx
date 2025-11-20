import Link from "next/link";
import { siteConfig } from "@/lib/config/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/30 bg-white/70 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-[#0b3a63]">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0b3a63] text-white">
            S3
          </div>
          <div className="flex flex-col leading-tight">
            <span>S3 V Trading</span>
            <span className="text-xs font-normal text-[#475467]">
              Industrial Systems
            </span>
          </div>
        </Link>
        <nav className="hidden gap-6 text-sm font-medium text-[#0b3a63] md:flex">
          {siteConfig.primaryNav.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-[#ff8a00]">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden md:inline-flex" asChild>
            <a href="#contact">Contact Sales</a>
          </Button>
          <Button size="sm" asChild>
            <a href="#quote">Request Quote</a>
          </Button>
        </div>
      </Container>
    </header>
  );
}

