import { HeroSection } from "@/components/sections/hero";
import { CategoryGridSection } from "@/components/sections/category-grid";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { SolutionsSection } from "@/components/sections/solutions";
import { ServicesSection } from "@/components/sections/services";
import { ContactSection } from "@/components/sections/contact";
import { NewsletterSection } from "@/components/sections/newsletter";
import { AssuranceStrip } from "@/components/sections/assurance";
import {
  getFeaturedCategories,
  getHighlightedProducts,
  getServiceOfferings,
  getSolutionStories,
} from "@/lib/repositories/catalog";

export default async function Home() {
  const [categories, products, solutions, services] = await Promise.all([
    getFeaturedCategories(),
    getHighlightedProducts(),
    getSolutionStories(),
    getServiceOfferings(),
  ]);

  return (
    <>
      <HeroSection />
      <AssuranceStrip />
      <CategoryGridSection categories={categories} />
      <ProductShowcase products={products} />
      <SolutionsSection solutions={solutions} />
      <ServicesSection services={services} />
      <ContactSection />
      <NewsletterSection />
    </>
  );
}
