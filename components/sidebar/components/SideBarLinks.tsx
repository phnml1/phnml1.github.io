import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import GithubIcon from '@/public/profile/github-mark.svg';
import GmailIcon from '@/public/profile/gmail-icon.svg';
import { email, github } from '@/Constants';

interface SideBarLinksProps {
  theme: string; // 혹은 실제로 사용되는 테마 값에 맞게 수정
  contents: string[];
  setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}
const PageLinksObj = {
  'Category': '/posts/all',
  'Tag': '/posts/tag/all',
  'Main': '/',
  'Search': '/posts/search'
};

const SideBarLinks: React.FC<SideBarLinksProps> = (props: SideBarLinksProps) => {
  const { systemTheme, setTheme, resolvedTheme } = useTheme();
  const [prevsys, setPrevsys] = useState(systemTheme);
  useEffect(() => {
    if (prevsys != systemTheme) {
      setTheme(systemTheme);
      setPrevsys(systemTheme);
    }
  }, [systemTheme]);
  return (
    <div className="w-full">
      <div className="py-4 mt-4 mb-4  w-full h-3">
        <div className="mx-8 text-sm text-slate-800 dark:text-gray-400">{props.theme}</div>
      </div>
      {props.contents.map((a, i) => {
        if (props.theme === 'Page') {
          return (
            <Link
              key={i}
              href={`${PageLinksObj[a]}`}
              onClick={() => {
                props.setSideBar(false);
              }}
            >
              <div className="w-full h-auto py-4 cursor-pointer rounded-lg hover:bg-slate-200 dark:hover:bg-dark-secondary">
                <div className="mx-12 text-md text-black dark:text-dark-primary">{a}</div>
              </div>
            </Link>
          );
        }
        if (props.theme == 'Contact') {
          if (a == 'Email') {
            return (
              <Link
                key={i}
                href={`${email.link}`}
                onClick={() => {
                  props.setSideBar(false);
                }}
              >
                <div className="w-full h-auto items-center py-4 cursor-pointer rounded-lg hover:bg-slate-200 dark:hover:bg-dark-secondary">
                  <div className='flex mx-8 gap-4 items-center'>
                  <div>
                  <GmailIcon width = '20' height = '20'/>
                  </div>
                  <div>
                  <div className="text-md text-black dark:text-dark-primary">{a}</div>
                  <div className='text-xs text-black dark:text-dark-secondary'>{email.name}</div>
                  </div>
                  </div>
                </div>
              </Link>
            );
          }
          if (a == 'Github') {
            return (
              <Link
                key={i}
                href={`${github.link}`}
                onClick={() => {
                  props.setSideBar(false);
                }}
              >
                 <div className="w-full h-auto items-center py-4 cursor-pointer rounded-lg hover:bg-slate-200 dark:hover:bg-dark-secondary">
                  <div className='flex mx-8 gap-4 items-center'>
                  <div>
                  <GithubIcon width = '20' height = '20'/>
                  </div>
                  <div>
                  <div className="text-md text-black dark:text-dark-primary">{a}</div>
                  <div className='text-xs text-black dark:text-dark-secondary'>{email.name}</div>
                  </div>
                  </div>
                </div>
              </Link>
            );
          }
        }
        if (props.theme == 'Preference') {
          return (
            <div
              key={i}
              onClick={() => {
                setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
              }}
            >
              <div className="w-full h-auto py-4 cursor-pointer rounded-lg hover:bg-slate-200 dark:hover:bg-dark-secondary">
                <div className="mx-12 text-md text-black dark:text-dark-primary">
                  {resolvedTheme == 'dark' ? 'Light Mode' : 'Dark Mode'}
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <Link
              key={i}
              href={`/posts/${a}`}
              onClick={() => {
                props.setSideBar(false);
              }}
            >
              <div className="w-full h-auto py-4 cursor-pointer rounded-lg hover:bg-slate-200 dark:hover:bg-dark-secondary">
                <div className="mx-12 text-md text-black dark:text-dark-primary">{a}</div>
              </div>
            </Link>
          );
        }
      })}
    </div>
  );
};
export default SideBarLinks;
