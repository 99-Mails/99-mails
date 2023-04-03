import { useState } from "react";
import useSound from "use-sound";
const Deduction = new URL('../../public/deduction-588.mp3', import.meta.url).href
const Relaxing = new URL('../../public/relax-message-tone.mp3', import.meta.url).href

const useSoundEffects = () => {
  const [isSoundEffect, setSoundEffect] = useState(false);
  const [playDeduction] = useSound(Deduction);
  const [playRelaxing] = useSound(Relaxing);

  const toggleSoundEffect = () => setSoundEffect(isSoundEffect ? false : true);

  const playDeductionEffect = () => playDeduction()
  const playRelaxingEffect = () => playRelaxing()

  return {
    isSoundEffect,
    toggleSoundEffect,
    playDeductionEffect,
    playRelaxingEffect
  };
};

export { useSoundEffects };
