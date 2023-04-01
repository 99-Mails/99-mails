import { useState } from "react";
import { Text } from "@chakra-ui/react";
import { createTimer, FancyDate } from "@/lib/date";
import useInterval from "@/hooks/useInterval";

type TimerProps = {
  time: number;
  isDisabled: boolean;
};

const timer = new FancyDate();

const Timer = ({ time, isDisabled }: TimerProps) => {
  return (
    <Text data-testid="timer" as="b">
      {timer.getRemaindedMMSSFromSeconds(time)}
    </Text>
  );
};

export { Timer };
