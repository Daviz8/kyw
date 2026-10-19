


export type AppLink = {
  name: string;
  url: string;
  slug?: string;
};

export type FooterLinkGroup = {
  name: string;
  subLinks: AppLink[];
};

export const navLinks: AppLink[] = [
  { name: "Home", url: "/", slug: "home" },
  { name: "About", url: "/about", slug: "about" },
  { name: "Book a Session", url: "/book-a-session", slug: "book" },
  { name: "Donate", url: "/donate", slug: "donate" },
  { name: "Blog", url: "/blog", slug: "blog" },
  { name: "Contact Us", url: "/contact", slug: "contact" },
];

export const footerLinks = [
  {
    name: "Book a Session",
    subLinks: [
      { url: "/book-a-session", name: "Start Intake Form", slug: "book" },
      { url: "/contact", name: "Ask a Question", slug: "question" },

    ],
  },
  {
    name: "Support",
    subLinks: [
      { url: "/contact", name: "Help Center", slug: "help" },
      { url: "/contact", name: "Contact Us", slug: "contact" },
      { url: "/donate", name: "Donate", slug: "donate" },
    ],
  },
  {
    name: "KYW Wellness",
    subLinks: [
      { url: "/about", name: "About Us", slug: "about" },
      { url: "/blog", name: "Blog", slug: "blog" },
    ],
  },
];