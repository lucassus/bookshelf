import { RefObject, useCallback, useEffect } from "react";

export const useClickAway = (
  ref: RefObject<HTMLElement | null>,
  onClickAway: () => void
) => {
  const handleClickOutside = useCallback(
    (event) => {
      const { current: el } = ref;

      if (el && !el.contains(event.target)) {
        event.stopPropagation();
        onClickAway();
      }
    },
    [onClickAway, ref]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);
};
