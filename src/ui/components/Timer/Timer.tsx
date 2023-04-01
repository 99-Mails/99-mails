import { Text } from "@chakra-ui/react";
import { FancyDate } from "@/lib/date";

type TimerProps = {
  time: number;
  isDisabled: boolean;
};

const timer = new FancyDate();

const Timer = ({ time }: TimerProps) => {
  return (
    <Text data-testid="timer" as="b">
      {timer.getRemaindedMMSSFromSeconds(time)}
    </Text>
  );
};

export { Timer };
