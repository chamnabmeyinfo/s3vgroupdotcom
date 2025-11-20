import {
  Boxes,
  Layers,
  Scale,
  Truck,
  Warehouse,
} from "lucide-react";
import type { CategorySummary } from "@/types/catalog";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  scale: Scale,
  activity: Warehouse,
  layers: Layers,
  truck: Truck,
  boxes: Boxes,
};

type CategoryGridProps = {
  categories: CategorySummary[];
};

export function CategoryGridSection({ categories }: CategoryGridProps) {
  return (
    <section id="products" className="bg-white py-20">
      <Container className="space-y-12">
        <SectionHeading
          eyebrow="Product Portfolio"
          title="Shop by category"
          description="Eighteen product lines covering weighing, storage, intralogistics, plastics, and safety systems."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon ? iconMap[category.icon] ?? Boxes : Boxes;
            return (
              <article
                key={category.id}
                className="group rounded-3xl border border-[#0b3a63]/10 bg-[#f8fafc] p-6 transition hover:-translate-y-1 hover:border-[#0b3a63]/30"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0b3a63] shadow">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0b3a63]">
                      {category.name}
                    </h3>
                    <p className="text-sm text-[#475467]">
                      {category.description}
                    </p>
                  </div>
                </div>
                <a
                  href={`/products/${category.slug}`}
                  className="mt-6 inline-flex items-center text-sm font-semibold text-[#ff8a00]"
                >
                  View products →
                </a>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

