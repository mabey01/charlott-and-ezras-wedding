import { useKey } from "react-use";

type handleNavigation = () => void;

export function useKeyboardNavigation(
  onPrevious: handleNavigation,
  onNext: handleNavigation
) {
  useKey("ArrowLeft", onPrevious, {}, [onPrevious]);
  useKey("ArrowRight", onNext, {}, [onNext]);
}
