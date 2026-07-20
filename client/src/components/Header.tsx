import { SectionLogo, SectionLogin, SectionNavItem } from './elements/containers';
import { TNavItem } from './utils/types';

export default function Header() {
  const list_nav_items: TNavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-100">
      <nav className="bg-teal-800 border-b border-gray-200 shadow-sm w-full pt-2 relative">
        <SectionLogin />
        <SectionLogo />
        <SectionNavItem nav_items={list_nav_items} />
      </nav>
    </header>
  );
}