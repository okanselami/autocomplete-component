import { AutoCompleteOptionItem } from "../../types";

export type { AutoCompleteOptionItem };

export type UseSearchProps = {
  onSearch: (searchTerm: string) => Promise<AutoCompleteOptionItem[]>;
  maxSuggestions: number;
  debounceTime: number;
};

export type UseSearchReturn = {
  loading: boolean;
  error: boolean;
  options: AutoCompleteOptionItem[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};
