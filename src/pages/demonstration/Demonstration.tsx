import { useState } from "react";

import Autocomplete, {
  AutoCompleteOptionItem,
} from "../../components/autocomplete";

import db from "../../db/db.json";

export const Demo = () => {
  const [selectedItem, setSelectedItem] =
    useState<AutoCompleteOptionItem | null>();

  const _onSearch = (value: string): Promise<AutoCompleteOptionItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filterResults = db.filter((result) =>
          result.name.toLowerCase().includes(value.toLowerCase())
        );
        resolve(filterResults);
      }, 1000);
    });
  };

  const _onSelect = (item: AutoCompleteOptionItem | null) => {
    setSelectedItem(item);
  };

  return (
    <div>
      <span>
        {selectedItem && (
          <pre>Selected Item: {JSON.stringify(selectedItem)}</pre>
        )}
        {!selectedItem && <pre>Selected Item: None</pre>}
      </span>
      <Autocomplete
        onSearch={_onSearch}
        onSelect={_onSelect}
        placeholder="Search for a users..."
        debounceTime={300}
        maxSuggestions={10}
      />
    </div>
  );
};
