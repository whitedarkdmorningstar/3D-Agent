import ResultList from "@/components/search/result-list";
import SearchInput from "@/components/search/search-input";
import { useSearch } from "@/components/search/use-search";

export default function Search() {
  const search = useSearch();

  return (
    <>
      <SearchInput onChangeQuery={search.onChangeQuery} />
      <ResultList {...search} />
    </>
  );
}
