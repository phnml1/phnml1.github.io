interface SearchInput {
  keyword:string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput:React.FC<SearchInput> = (props:SearchInput) => {
  return (<input type="text" value={props.keyword} onChange={(e) => {props.setKeyword(e.target.value)}} placeholder="포스트 제목 검색" className='outline-none transition-all border-2 border-slate-200 focus:border-indigo-200 dark:border-dark-secondary border-solid rounded-lg px-6 w-full h-14 '/>);
}
export default SearchInput;