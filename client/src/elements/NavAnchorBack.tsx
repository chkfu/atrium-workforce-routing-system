import nav_left_icon from '../assets/svg/nav_left_icon.svg';

export default function NavAnchorBack({ url }: { url: string }) {
  return (
    <a
      href={url}
      className="absolute top-12 left-10 flex items-center gap-1 text-sm text-teal-600 underline bold hover:brightness-110"
    >
      <img src={nav_left_icon} alt="navigate_back" width="18" height="18" />
      Back
    </a>
  );
}
