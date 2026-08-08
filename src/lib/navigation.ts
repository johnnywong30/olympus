export type NavLink = {
  title: string;
  url: string;
  isDefaultOpen?: boolean;
  icon?: string;
  items?: NavLink[];
};

const navLinks = [
  {
    title: 'Apps',
    url: '/dashboard',
    items: [
      {
        title: 'Plutus',
        url: '/dashboard/plutus',
      },
    ],
    isDefaultOpen: true,
    icon: 'BrainCircuit',
  },
  {
    title: 'Documentation',
    url: '/documentation',
    items: [
      {
        title: 'Introduction',
        url: '/documentation/intro',
      },
      {
        title: 'Get Started',
        url: '/documentation/get-started',
      },
      {
        title: 'Tutorials',
        url: '/documentation/tutorials',
      },
      {
        title: 'Changelog',
        url: '/documentation/changelog',
      },
    ],
    icon: 'BookOpen',
  },
  {
    title: 'Settings',
    url: '#',
    items: [
      {
        title: 'Account',
        url: '/settings/account',
      },
    ],
    icon: 'Settings2',
  },
];

export const NavLinks: NavLink[] = navLinks.map((link) => ({
  title: link.title,
  url: link.url,
  isDefaultOpen: link.isDefaultOpen,
  icon: link.icon,
  items: link.items?.map((item) => ({
    title: item.title,
    url: item.url,
  })),
}));
