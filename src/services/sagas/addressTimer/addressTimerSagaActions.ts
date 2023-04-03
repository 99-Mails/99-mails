export const actionTypes = {
  START: "START",
  STOP: "STOP",
  TICK: "TICK",
  RESET: "RESET",
};

export const Start = () => ({ type: actionTypes.START });

export const Stop = () => ({ type: actionTypes.STOP });

export const Tick = () => ({ type: actionTypes.TICK });

export const Reset = () => ({ type: actionTypes.RESET });
