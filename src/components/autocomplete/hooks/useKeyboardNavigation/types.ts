
export enum ARROW_KEY_CODES {
    UP = 38,
    DOWN = 40,
    ENTER = 13,
  }
  
export interface UseKeyboardNavigationProps {
  onEnter: () => void;
  onArrowUp: () => void;
  onArrowDown: () => void;
}
