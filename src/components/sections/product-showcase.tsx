import { formatCurrency } from "@/lib/utils";
import type { ProductSummary } from "@/types/catalog";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type ProductShowcaseProps = {
  products: ProductSummary[];
};

export function ProductShowcase({ products }: ProductShowcaseProps) {
  return (
    <section className="bg-[#f5f7fa] py-20">
      <Container className="space-y-12">
        <SectionHeading
          eyebrow="Featured Systems"
          title="Pre-engineered packages ready to deploy"
          description="Each system ships with commissioning, calibration certificates, and operator training."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {products.map((product) => (
            <article
              key={product.id}
              className="rounded-[32px] border border-white/60 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
            >
              {product.badge && (
                <Badge className="mb-4 bg-[#0b3a63] text-white">
                  {product.badge}
                </Badge>
              )}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold text-[#0b3a63]">
                      {product.name}
                    </h3>
                    <p className="text-sm uppercase tracking-[0.2em] text-[#94a3b8]">
                      {product.categorySlug.replace("-", " ")}
                    </p>
                  </div>
                  <div
                    className="h-20 w-32 rounded-2xl bg-gradient-to-br from-[#0b3a63]/10 to-[#0b3a63]/40"
                    style={{
                      backgroundImage: product.heroImage
                        ? `linear-gradient(rgba(11,58,99,0.15), rgba(11,58,99,0.4)), url(${product.heroImage})`
                        : undefined,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </div>
                <p className="text-base text-[#475467]">{product.summary}</p>
                <ul className="flex flex-wrap gap-2 text-sm text-[#0b3a63]">
                  {product.highlights.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-[#0b3a63]/20 px-3 py-1"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-[#94a3b8]">
                      From
                    </p>
                    <p className="text-2xl font-semibold text-[#0b3a63]">
                      {product.price
                        ? formatCurrency(product.price, "USD")
                        : "Custom quote"}
                    </p>
                  </div>
                  <Button variant="primary" size="md" asChild>
                    <a href={`/products/${product.slug}`}>View specs</a>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

