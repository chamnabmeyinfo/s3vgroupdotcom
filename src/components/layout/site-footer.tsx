import { siteConfig } from "@/lib/config/site";
import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/40 bg-[#0b1120] text-white">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <div className="text-lg font-semibold">{siteConfig.name}</div>
          <p className="text-sm text-white/70">{siteConfig.tagline}</p>
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} S3 V Trading Group. All rights reserved.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
            Contact
          </p>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>{siteConfig.contact.address}</li>
            <li>{siteConfig.contact.email}</li>
            <li>{siteConfig.contact.phonePrimary}</li>
            <li>{siteConfig.contact.phoneSecondary}</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
            Quick Links
          </p>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            {siteConfig.primaryNav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
            Follow
          </p>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            {siteConfig.social.map((item) => (
              <li key={item.href}>
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

