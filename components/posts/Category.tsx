import Image from 'next/image';
interface CategoryProps {
  text: string;
  image: string;
}

const Category: React.FC<CategoryProps> = (props) => {
  return (
    <div className="flex justify-center items-center h-full cursor-pointer">
      <div className="w-3/5 h-full flex flex-col items-center">
        <div className="w-4/5 h-4/5 relaitve flex justify-center items-center">
          <Image src={props.image} width={0} height={0} sizes='100vw' style={{width: '100%', height: 'auto'}} alt="eeee" objectFit="contain" />
        </div>
        <div className="text-center h-1/5">{props.text}</div>
      </div>
    </div>
  );
};
export default Category;
