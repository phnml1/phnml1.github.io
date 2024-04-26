import Link from 'next/link';

interface CategoryMenusProps {
  categorys: string[];
  currentCategory: string;
  theme: string;
}

const CategoryMenus: React.FC<CategoryMenusProps> = ({ categorys, currentCategory, theme }) => {
  const categoryLink = (category: string): string => {
    if (theme === 'tag') {
      return `/posts/tag/${category}`;
    } else {
      return `/posts/${category}`;
    }
  };
  return (
    <div
      className={`w-full transition-all mt-8 pl-8 pr-8 md:w-4/5 h-auto flex flex-col items-start justify-end left-0 right-0 border-r-0`}
    >
      {(theme==='category') &&(
      <div className='w-auto font-extrabold text-2xl md:text-3xl mb-2'>Categories.
      </div>)}
      {(theme==='tag') && (
      <div className='w-auto font-extrabold text-2xl md:text-3xl mb-4'>Tags.
      </div>)}
      <div className={`w-full h-auto transition-all top-0`}>
       {
       
      theme === 'category' && (
        <div
          className={`top-0 flex-wrap rounded-xl h-auto mb-1 w-full pr-2 py-2 gap-2 flex justify-start items-center cursor-pointer`}
        >
          {(currentCategory === 'all')? (<Link
                  href='/posts/all'
                  className="transition-all w-32 h-40 md:text-md lg:text-lg border-indigo-400 dark:border-indigo-200 dark:text-indigo-200 bg-indigo-400 scale-110 text-white dark:bg-indigo-200 border-2 border-solid rounded-lg py-2 px-2 my-2 mx-2 text-center flex justify-center items-center cursor-pointer"
                >
                  All Posts
                </Link>): (<Link 
                href='/posts/all'
                className="transition-all w-32 h-40 md:text-md lg:text-lg border-indigo-400 text-indigo-400 dark:border-indigo-4200 dark:text-indigo-200 hover:scale-110 dark:bg-dark-secondary dark:hover:bg-indigo-200 border-2 border-solid rounded-lg py-2 px-2 my-2 mx-2 text-center flex justify-center items-center cursor-pointer"
                >
                  All Posts
                </Link>)}
          
          {categorys?.map((a, i) => {
            if (a == currentCategory) {
              return (
                <Link
                  href={`${categoryLink(a)}`}
                  key={i}
                  className="transition-all w-32 h-40 md:text-md lg:text-lg border-indigo-400 dark:border-indigo-200 dark:text-indigo-200 bg-indigo-400 scale-110 text-white dark:bg-indigo-200 border-2 border-solid rounded-lg py-2 px-2 my-2 mx-2 text-center flex justify-center items-center cursor-pointer"
                >
                  {a}
                </Link>
              );
            } else {
              return (
                <Link
                  href={`${categoryLink(a)}`}
                  key={i}
                  className="transition-all w-32 h-40 md:text-md lg:text-lg border-indigo-400 text-indigo-400 dark:border-indigo-4200 dark:text-indigo-200 hover:scale-110 dark:bg-dark-secondary dark:hover:bg-indigo-200 border-2 border-solid rounded-lg py-2 px-2 my-2 mx-2 text-center flex justify-center items-center cursor-pointer"
                >
                  {a}
                </Link>
              );
            }
          })}
        </div>
        )
      }
      {
        theme === 'tag' && (
        <div
          className={`top-0 flex-wrap rounded-xl h-auto mb-1 w-full ml-2 pr-2 py-2 gap-2 flex justify-start items-center cursor-pointer`}
        >
          {(currentCategory!=='all') && (<Link
                href = {`/posts/tag/all`}
                className="transition-all rounded-lg w-auto text-xs md:text-sm lg:text-md text-center flex-wrap py-2 px-4 my-2 mx-2 bg-slate-100 hover:bg-[#2196f3] hover:text-white dark:bg-dark-secondary dark:hover:bg-[#2196f3]"
              >
                All Posts
              </Link>)}
          {
          categorys?.map((a, i) => {
            if (a==currentCategory) {
            return (
              <Link
                href = {`${categoryLink(a)}`}
                key={i}
                className="transition-all rounded-lg w-auto text-xs md:text-sm lg:text-md text-center flex-wrap py-2 px-4 my-2 mx-2 bg-[#2196f3] text-white dark:bg-[#2196f3]"
              >
                {a}
              </Link>
            );
            } else {
              return (
                <Link
                href = {`${categoryLink(a)}`}
                key={i}
                className="transition-all rounded-lg w-auto text-xs md:text-sm lg:text-md text-center flex-wrap py-2 px-4 my-2 mx-2 bg-slate-100 hover:bg-[#2196f3] hover:text-white dark:bg-dark-secondary dark:hover:bg-[#2196f3]"
              >
                {a}
              </Link>
              )
            }
          })}
        </div>
        )
}
      </div>
    </div>
  );
};
export default CategoryMenus;
