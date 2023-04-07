import { Text } from "@chakra-ui/react";
import { FancyDate } from "@/lib/date";
import { useMemo } from "react";

type TimerProps = {
  time: number;
  isDisabled: boolean;
};

const Timer = ({ time }: TimerProps) => {
  const timer = useMemo(() => new FancyDate(), []);

  return (
    <Text data-testid="timer" as="b">
      {timer.getRemaindedMMSSFromSeconds(time)}
    </Text>
  );
};

export { Timer };
