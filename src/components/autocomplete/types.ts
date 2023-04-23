export interface AutocompleteProps {
  onSelect?: (item: AutoCompleteOptionItem | null) => void;
  onSearch: (searchTerm: string) => Promise<AutoCompleteOptionItem[]>;
  debounceTime?: number;
  maxSuggestions?: number;
  placeholder?: string;
}

export interface AutocompleteOptionProps {
  item: AutoCompleteOptionItem;
  isActive: boolean;
  isSelected: boolean;
  onSelect: (item: AutoCompleteOptionItem) => void;
  searchValue: string;
}

export interface AutoCompleteOptionItem {
  id: number;
  name: string;
}



