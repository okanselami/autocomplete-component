import { useState, useEffect } from "react";

import { useDebounce } from "../../../../hooks/useDebounce";

import {
  UseSearchProps,
  UseSearchReturn,
  AutoCompleteOptionItem,
} from "./types";

export function useSearch({
  onSearch,
  maxSuggestions,
  debounceTime
}: UseSearchProps): UseSearchReturn {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [options, setoptions] = useState<
    AutoCompleteOptionItem[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery, debounceTime);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const results = await onSearch(debouncedSearchQuery);
        setoptions(results.slice(0, maxSuggestions));
        setLoading(false);
      } catch (error) {
        setError(true);
      } 
    };
    fetchData();
  }, [debouncedSearchQuery, maxSuggestions, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return {
    loading,
    error,
    searchQuery,
    setSearchQuery,
    options,
    handleInputChange,
  };
}
