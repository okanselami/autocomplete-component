import React, { useState, useEffect, useRef, useCallback } from "react";

import AutocompleteOption from "./AutoCompleteOption";

import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useSearch } from "./hooks/useSearch/useSearch";
import { useKeyboardNavigation } from "./hooks/useKeyboardNavigation/useKeyboardNavigation";

import { AutocompleteProps, AutoCompleteOptionItem } from "./types";

import styles from "./Autocomplete.module.css";

import { ChevronDown, ChevronUp, Close, Loading } from "../../asset";

const Autocomplete = React.memo(
  ({
    onSelect,
    onSearch,
    placeholder = "Search...",
    debounceTime = 300,
    maxSuggestions = 10,
  }: AutocompleteProps): JSX.Element => {
    const inputWrapperRef = useRef<HTMLDivElement>(null);

    const [selectedItem, setSelectedItem] =
      useState<AutoCompleteOptionItem | null>(null);
    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const [showOptions, setShowOptions] = useState(false);

    const {
      error,
      options,
      loading,
      searchQuery,
      setSearchQuery,
      handleInputChange,
    } = useSearch({ onSearch, maxSuggestions, debounceTime });

    // When user click outside the input field then hide the options
    useOutsideClick(inputWrapperRef, () => {
      setShowOptions(false);
    });

    // When user remove all text from input field then clear the selected item
    useEffect(() => {
      if (searchQuery === "") {
        clearSelectedItem();
      }
    }, [searchQuery]);

    // When user not remove all text from input field then set input field value to selected item name
    useEffect(() => {
      if (!showOptions && selectedItem) {
        setSearchQuery(selectedItem.name);
      }
    }, [showOptions, selectedItem, setSearchQuery]);

    // When user select an option from the list then set input field value to selected item name
    const handleSelectedOption = useCallback(
      (item: AutoCompleteOptionItem) => {
        onSelect && onSelect(item);
        setSelectedItem(item);
        setSearchQuery(item.name);
      },
      [onSelect, setSearchQuery]
    );

    // When user click on close icon then clear the selected item
    const clearSelectedItem = useCallback(() => {
      onSelect && onSelect(null);
      setSearchQuery("");
      setSelectedItem(null);
    }, [onSelect, setSearchQuery]);

    const onEnter = () => {
      if (showOptions && options.length > 0) {
        const selectedSuggestion = options[activeSuggestion];
        handleSelectedOption(selectedSuggestion);
      }
    };

    const onArrowUp = () => {
      if (activeSuggestion === 0) {
        // If user press up arrow key on first item then set active suggestion to last item
        setActiveSuggestion(options.length - 1);
      } else {
        setActiveSuggestion(activeSuggestion - 1);
      }
    };

    const onArrowDown = () => {
      if (activeSuggestion === options.length - 1) {
        setActiveSuggestion(0);
      } else {
        setActiveSuggestion(activeSuggestion + 1);
      }
    };

    const [handleKeyDown] = useKeyboardNavigation({
      onArrowDown,
      onArrowUp,
      onEnter,
    });

    return (
      <div className={styles["autocomplete"]} ref={inputWrapperRef}>
        <input
          id="autocomplete-input"
          className={`${styles["autocomplete__input"]} ${error && styles["autocomplete__input--error"]}`}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          aria-autocomplete="list"
          aria-controls="autocomplete-suggestions"
          aria-haspopup="listbox"
          role="combobox"
          aria-expanded={showOptions}
          placeholder={placeholder}
          onClick={() => setShowOptions(true)}
        />
        <div className={styles["autocomplete__input_append"]}>
          {loading && <Loading />}
          {selectedItem && !loading && <Close onClick={clearSelectedItem} />}
          {showOptions ? <ChevronDown /> : <ChevronUp />}
        </div>
        {showOptions && (
          <ul
            id="autocomplete-suggestions"
            className={styles["autocomplete__suggestions"]}
            role="listbox"
          >
            {options.map((item, index) => (
              <AutocompleteOption
                key={item.id}
                item={item}
                isActive={index === activeSuggestion}
                isSelected={selectedItem?.id === item.id}
                onSelect={handleSelectedOption}
                searchValue={searchQuery}
              />
            ))}
          </ul>
        )}
      </div>
    );
  }
);

export default Autocomplete;