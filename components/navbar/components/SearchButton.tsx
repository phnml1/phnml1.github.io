import SearchIconLight from '@/public/navbar/searchIconLight.svg';
import SearchIconDark from '@/public/navbar/searchIconDark.svg'
import Link from 'next/link';

interface SearchButtonProps {
  setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  theme: string;
}

const SearchButton: React.FC<SearchButtonProps> = (props) => {


  return (
    <Link
    href={'/posts/search'}
      className="cursor-pointer transition-all w-auto h-auto rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700"
    >
      <div className='-mt-0.5'
     >
      {props.theme=='dark'?(<SearchIconDark  width={50} height={50}/>):(<SearchIconLight width={50} height={50}/>)}
      </div>
    </Link>
  );
};
export default SearchButton;