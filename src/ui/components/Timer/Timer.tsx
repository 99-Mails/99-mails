import { useState } from "react";
import { Text } from "@chakra-ui/react";
import { createTimer } from "@/lib/date";
import useInterval from "@/hooks/useInterval";

type TimerProps = {
  expiresAt: string;
  isDisabled: boolean;
};

const Timer = ({ expiresAt, isDisabled }: TimerProps) => {
  const [time, setTime] = useState("");

  const myDate = createTimer(expiresAt);

  useInterval(
    () => {
      setTime(myDate.getRemaindedMMSS());
    },
    !isDisabled ? 1000 : 0
  );

  return (
    <Text data-testid="timer" as="b">
      {time}
    </Text>
  );
};

export { Timer };
