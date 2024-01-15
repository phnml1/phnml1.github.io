const DetailNav = () => {
  return (<section className="w-full flex-col flex gap-8 mt-20 mb-20 lg:flex-row lg:gap-52">
    <div className="w-full h-40 rounded-lg border-[1px] border-detailnav cursor-pointer hover:scale-105 transition-all p-8 lg:w-[calc(50%-6.5rem)] dark:border-darkdetailnav">
      <div className="text-sm mb-2">이전글</div>
      <div className='font-bold mb-2 text-lg'>Mastering Javascript</div>
      <div className='text-base whitespace-nowrap overflow-ellipsis overflow-hidden'>NextJS is a the React framework for production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR</div>
    </div>
    <div className="w-full h-40 rounded-lg border-[1px] border-detailnav cursor-pointer hover:scale-105 transition-all p-8 lg:w-[calc(50%-6.5rem)] dark:border-darkdetailnav">
    <div className="text-sm mb-2">다음글</div>
      <div className='font-bold mb-2 text-lg'>Mastering Javascript</div>
      <div className='text-base whitespace-nowrap overflow-ellipsis overflow-hidden'>NextJS is a the React framework for production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR</div>
    </div>
  </section>)
}
export default DetailNav;