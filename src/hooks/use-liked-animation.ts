import { usePrevious } from "@react-hookz/web";
import { useAnimationControls } from "framer-motion";
import { useEffect } from "react";

export function useLikedAnimation(play?: boolean) {
  const previousPlay = usePrevious(play);
  const controls = useAnimationControls();

  const playLikedAnimation = async () => {
    await controls.start({
      opacity: 1,
      transition: {
        duration: 0.1,
      },
    });

    await controls.start({
      scale: 3,
      transition: {
        type: "spring",
        stiffness: 1600,
        damping: 32,
      },
    });

    await controls.start({
      opacity: 0,
      scale: 1,
      transition: {
        delay: 1,
        duration: 0.1,
      },
    });
  };

  useEffect(() => {
    if (play === undefined) return;
    if (previousPlay === undefined) return;
    if (play === false) return;
    if (previousPlay === true) return;

    playLikedAnimation();
  }, [play, previousPlay]);

  return controls;
}
