import { useTheme } from 'next-themes';
import Image from 'next/image';
const HomeIntro: React.FC = () => {
  const { resolvedTheme } = useTheme();
  let src:string;
  switch (resolvedTheme) {
    case 'light':
      src = '/daymode.jpg'
      break
    case 'dark':
      src = '/darkmode.jpg'
      break
    default:
      src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
      break
  }
  return (
    <div className="relative w-full h-96 z-20 flex justify-center">
      <div className="absolute inset-0 z-20" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}></div>
      <Image
        alt="daymode"
        src={src}
        quality={100}
        fill
        objectFit="cover"
        className="w-full h-full"
      />
      <div className="w-full h-full md:w-4/5 z-20 relative text-white dark:text-[#E5E5E5]">
        <div className="absolute left-8 bottom-12">
          <div className="text-lg md:text-xl">안녕하세요. 제 블로그에 와주셔서 감사합니다.</div>
          <div className="text-md md:text-lg mt-4">
            저는 프론트엔드 개발과 알고리즘을 공부하고, 공부한 지식들을 이곳에 기록하고 있습니다.
            <br />
            부족하지만 좋게 봐주시면 감사드리겠습니다.
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeIntro;
