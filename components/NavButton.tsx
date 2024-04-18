import Link from 'next/link';

interface NavButtonProps {
  link: string;
  content: string;
}
const NavButton: React.FC<NavButtonProps> = (props) => {
  return (
    <Link href={`${props.link}`}>
      <div className="flex gap-2 text-xl font-semibold text-gray-500 cursor-pointer transition-all hover:text-black group dark:hover:text-dark-primary">
        {props.content}
      </div>
    </Link>
  );
};
export default NavButton;