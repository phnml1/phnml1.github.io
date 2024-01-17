import Link from "next/link";

interface DetailNavProps {
  prevData: {title:string, summary:string, slug:string} | number;
  nextData: {title:string, summary:string, slug:string} | number;
}

const DetailNav:React.FC<DetailNavProps> = (props) => {
  return (<section className="w-full flex-col flex gap-8 mt-20 mb-20 lg:flex-row lg:gap-52">
    {typeof props.prevData === 'object' && (
        <Link href = {`${props.prevData.slug}`} className="w-full h-auto rounded-lg border-[1px] break-words border-detailnav cursor-pointer hover:scale-105 transition-all p-8 lg:w-[calc(50%-6.5rem)] dark:border-darkdetailnav">
          <div className="text-sm mb-2">이전글</div>
          <div className="font-bold mb-2 text-lg">{props.prevData.title}</div>
          <div className="text-sm line-clamp-2 overflow-hidden overflow-ellipsis text-slate-600 dark:text-dark-secondary">
            {props.prevData.summary}
          </div>
        </Link>
      )}
    {typeof props.nextData === 'object' && (
        <Link href = {`${props.nextData.slug}`} className="w-full h-auto rounded-lg border-[1px] break-words border-detailnav cursor-pointer hover:scale-105 transition-all p-8 lg:w-[calc(50%-6.5rem)] dark:border-darkdetailnav">
          <div className="text-sm mb-2">다음글</div>
          <div className="font-bold mb-2 text-lg">{props.nextData.title}</div>
          <div className="text-sm line-clamp-2 overflow-hidden overflow-ellipsis text-slate-600 dark:text-dark-secondary">
            {props.nextData.summary}
          </div>
        </Link>
      )}
  </section>)
}
export default DetailNav;