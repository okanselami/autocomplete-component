import { UseKeyboardNavigationProps, ARROW_KEY_CODES } from "./types";

export function useKeyboardNavigation({
  onEnter,
  onArrowUp,
  onArrowDown,
}: UseKeyboardNavigationProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { keyCode } = e;

    if (keyCode === ARROW_KEY_CODES.ENTER) {
      e.preventDefault();
      onEnter();
    } else if (keyCode === ARROW_KEY_CODES.UP) {
      e.preventDefault();
      onArrowUp();
    } else if (keyCode === ARROW_KEY_CODES.DOWN) {
      e.preventDefault();
      onArrowDown();
    }
  };

  return [handleKeyDown];
}
