import { useAnimationControls } from "framer-motion";

export function useLikedAnimation() {
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

  return { controls, play: playLikedAnimation };
}
