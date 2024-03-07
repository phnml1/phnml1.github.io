import Link from 'next/link';

interface PageButtonProps {
  index: number;
  setIndex: React.Dispatch<number>;
  currentPage: string;
  name: string;
  link: string;
}
const PageButton: React.FC<PageButtonProps> = (props) => {
  return (
    <div className="h-full flex justify-center items-center">
      {props.currentPage !== `${props.name}` ? (
        <Link
          href={`${props.link}`}
          onMouseEnter={() => props.setIndex(props.index)}
          onMouseLeave={() => {
            props.setIndex(999);
          }}
          className={`w-20 h-full md:w-32 flex justify-center items-center text-center rounded-t-lg hover:bg-indigo-100 transition-all`}
        >
          {props.name}
        </Link>
      ) : (
        <div
          className={`w-20 h-full bg-white md:w-32 flex justify-center items-center text-center rounded-t-lg `}
        >
          {props.name}
        </div>
      )}
    </div>
  );
};
export default PageButton;
