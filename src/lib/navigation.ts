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
    url: '#',
    items: [
      {
        title: 'Introduction',
        url: '#',
      },
      {
        title: 'Get Started',
        url: '#',
      },
      {
        title: 'Tutorials',
        url: '#',
      },
      {
        title: 'Changelog',
        url: '#',
      },
    ],
    icon: 'BookOpen',
  },
  {
    title: 'Settings',
    url: '#',
    items: [
      {
        title: 'General',
        url: '#',
      },
      {
        title: 'Team',
        url: '#',
      },
      {
        title: 'Billing',
        url: '#',
      },
      {
        title: 'Limits',
        url: '#',
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
