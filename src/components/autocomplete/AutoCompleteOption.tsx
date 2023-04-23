import { AutocompleteOptionProps } from "./types";

import styles from "./Autocomplete.module.css";

function AutocompleteOption({
  item,
  isActive,
  isSelected,
  searchValue,
  onSelect,
}: AutocompleteOptionProps): JSX.Element {
  const handleClick = () => {
    onSelect(item);
  };

  const getHighlightedText = (text: string, highlight: string) => {
    const parts = [...text.split(new RegExp(`(${highlight})`, "gi"))];

    return (
      <span>
        {parts.map((part, index) => {
          return part.toLowerCase() === highlight.toLowerCase() ? (
            <span
              key={index}
              style={
                part.toLowerCase() === highlight.toLowerCase()
                  ? { fontWeight: "bolder" }
                  : {}
              }
            >
              {part}
            </span>
          ) : (
            part
          );
        })}
      </span>
    );
  };

  return (
    <li
      className={`${styles["autocomplete__suggestion"]}  ${
        isSelected ? styles["autocomplete__suggestion--selected"] : ""
      } ${isActive ? styles["autocomplete__suggestion--active"] : ""}`}
      onClick={handleClick}
      aria-selected={isActive}
      role="option"
    >
      {getHighlightedText(item.name, searchValue)}
    </li>
  );
}

export default AutocompleteOption;
