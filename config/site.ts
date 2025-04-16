export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Top Memes",
  description: "Top memes",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "List Memes",
      href: "/list-memes",
    },
    {
      label: "Table Memes",
      href: "/table-memes",
    },
  ],
};
