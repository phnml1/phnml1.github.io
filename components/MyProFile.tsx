import Image from 'next/image';
import GithubIcon from '@/public/profile/github-mark.svg';
import GmailIcon from '@/public/profile/gmail-icon.svg';
import Link from 'next/link';
import { github } from '@/Constants';
const MyProFile: React.FC = () => {
  return (
    <div className="p-12 flex gap-4 justify-center items-center">
      <div>
        <Image
          src="/profile/profile.png"
          alt="my profile photo"
          width={80}
          height={80}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col w-auto gap-2">
        <div>
          <div className="w-full font-bold text-base mb-1">Phnml1</div>
          <div className="w-full text-sm text-slate-500 dark:text-dark-secondary">
            더디더라도 조금씩 성장하는 프론트엔드 개발자
          </div>
        </div>
        <div className="w-full flex gap-2">
          <Link href={`${github.link}`} target="_blank">
            <GithubIcon
              width="25"
              height="25"
              className="fill-slate-300 transition-all cursor-pointer hover:fill-black dark:hover:fill-white"
            />
          </Link>
          <Link href="mailto:juyung0903@gmail.com" target="_blank">
            <GmailIcon
              width="25"
              height="25"
              className="fill-slate-300 transition-all cursor-pointer hover:fill-black dark:hover:fill-white"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default MyProFile;
