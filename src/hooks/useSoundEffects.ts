import { useState } from "react";

const useSoundEffects = () => {
  const [isSoundEffect, setSoundEffect] = useState(false);

  const toggleSoundEffect = () => setSoundEffect(isSoundEffect ? false : true);

  return {
    isSoundEffect,
    toggleSoundEffect,
  };
};

export { useSoundEffects };
