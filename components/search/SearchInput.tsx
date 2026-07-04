interface SearchInputProps {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput: React.FC<SearchInputProps> = ({ keyword, setKeyword }) => {
  return (
    <input
      type="text"
      value={keyword}
      onChange={(event) => setKeyword(event.target.value)}
      placeholder="Search posts by title, summary, or tag"
      className="h-14 w-full rounded-xl bg-surface-container px-5 font-label text-sm text-white outline-none transition-colors placeholder:text-text-secondary focus:bg-surface-high"
    />
  );
};

export default SearchInput;
