import { useKeyboardEvent } from "@react-hookz/web";

type handleNavigation = () => void;

export function useKeyboardNavigation(
  onPrevious: handleNavigation,
  onNext: handleNavigation
) {
  useKeyboardEvent("ArrowLeft", onPrevious, [onPrevious], {
    eventOptions: { passive: true },
  });

  useKeyboardEvent("ArrowRight", onNext, [onNext], {
    eventOptions: { passive: true },
  });
}
