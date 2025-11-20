import {
  type CategorySummary,
  type ProductSummary,
  type ServiceOffering,
  type SolutionStory,
} from "@/types/catalog";

export const mockCategories: CategorySummary[] = [
  {
    id: "truck-scale",
    name: "Truck Scale",
    slug: "truck-scale",
    description: "Legal-for-trade weighbridges for high-volume logistics hubs.",
    icon: "scale",
  },
  {
    id: "digital-scale",
    name: "Digital Scale",
    slug: "digital-scale",
    description: "Precision bench and floor scales calibrated by our lab.",
    icon: "activity",
  },
  {
    id: "racking-system",
    name: "Racking System",
    slug: "racking-system",
    description: "Adjustable pallet racking for warehouses and factories.",
    icon: "layers",
  },
  {
    id: "material-handling",
    name: "Material Handling",
    slug: "material-handling",
    description: "Forklifts, stackers, and conveyors for safer throughput.",
    icon: "truck",
  },
  {
    id: "plastic-solution",
    name: "Plastic Systems",
    slug: "plastic-solution",
    description: "Injection-molded pallets, bins, baskets and partitions.",
    icon: "boxes",
  },
];

export const mockProducts: ProductSummary[] = [
  {
    id: "scale-01",
    name: "Digital Scale Indicator X7",
    slug: "digital-scale-indicator-x7",
    summary:
      "IP67 stainless enclosure, dual-range load cell support, MODBUS ready.",
    heroImage: "/images/products/indicator.jpg",
    highlights: ["IP67 enclosure", "MODBUS TCP", "3-year warranty"],
    price: 980,
    categorySlug: "digital-scale",
    badge: "Top Seller",
  },
  {
    id: "truck-01",
    name: "40m Steel Truck Scale",
    slug: "40m-steel-truck-scale",
    summary: "Surface-mount weighbridge with 120T capacity and remote IO.",
    heroImage: "/images/products/truck-scale.jpg",
    highlights: ["120T capacity", "Axle-by-axle", "Remote diagnostics"],
    categorySlug: "truck-scale",
    badge: "Flagship",
  },
  {
    id: "rack-01",
    name: "Adjustable Pallet Rack",
    slug: "adjustable-pallet-rack",
    summary: "Custom bay widths with powder-coated uprights and beams.",
    heroImage: "/images/products/racking.jpg",
    highlights: ["Custom spans", "Certified steel", "Rapid install"],
    price: 420,
    categorySlug: "racking-system",
  },
  {
    id: "lift-01",
    name: "Electric Reach Stacker",
    slug: "electric-reach-stacker",
    summary:
      "Lithium battery powered reach stacker rated for 1.6T at 5m height.",
    heroImage: "/images/products/staker.jpg",
    highlights: ["Li-ion power", "2hr fast charge", "Auto leveling forks"],
    price: 12300,
    categorySlug: "material-handling",
  },
];

export const mockSolutions: SolutionStory[] = [
  {
    id: "agri",
    title: "Agriculture Processing",
    description:
      "Integrated truck scales, sampling labs, and palletization for rice mills and cassava exporters.",
    industries: ["Rice Mills", "Agro Export"],
    ctaLabel: "See agriculture stack",
  },
  {
    id: "manufacturing",
    title: "Manufacturing Plants",
    description:
      "End-to-end intralogistics with mezzanines, conveyors, and QC metrology for assembly lines.",
    industries: ["Electronics", "Apparel", "Automotive"],
    ctaLabel: "Build your line",
  },
  {
    id: "logistics",
    title: "Logistics & Ports",
    description:
      "High-throughput weighbridges, yard management, and ruggedized material handling.",
    industries: ["Ports", "3PL", "Special Economic Zones"],
    ctaLabel: "Modernize the yard",
  },
];

export const serviceOfferings: ServiceOffering[] = [
  {
    id: "assurance",
    title: "Lifecycle Services",
    description: "Calibration, warranty, and on-site support across Cambodia.",
    items: [
      "ISO-certified calibration lab",
      "24h response service hotline",
      "Preventive maintenance plans",
    ],
  },
  {
    id: "deployment",
    title: "Project Delivery",
    description: "From layout design to civil works, we own the deployment.",
    items: [
      "Site survey and engineering drawings",
      "Permitting & compliance assistance",
      "Commissioning & operator training",
    ],
  },
];

