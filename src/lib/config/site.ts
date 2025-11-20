export const siteConfig = {
  name: "S3 V Trading Group",
  tagline: "Industrial weighing, storage, and handling systems for Cambodia.",
  contact: {
    email: "info@s3vtgroup.com.kh",
    phonePrimary: "+855 11 777 889",
    phoneSecondary: "+855 67 777 988",
    address: "Street 2004, Phnom Penh, Cambodia",
    hours: "Mon – Sat, 8:00 AM – 6:00 PM",
  },
  stats: [
    { label: "Years operating", value: "17+" },
    { label: "Product lines", value: "18" },
    { label: "National installs", value: "320+" },
  ],
  primaryNav: [
    { href: "#products", label: "Products" },
    { href: "#solutions", label: "Solutions" },
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ],
  social: [
    { label: "Facebook", href: "https://facebook.com" },
    { label: "YouTube", href: "https://youtube.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
};

export type NavItem = (typeof siteConfig.primaryNav)[number];

