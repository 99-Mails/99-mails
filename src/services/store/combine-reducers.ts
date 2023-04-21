// TODO: should find a better way to prevent dispatch going through all reducers
// TODO: make it type friendly
export const combineReducers = (slices) => (state, action) => {
  return Object.keys(slices).reduce(
    (acc, prop) => ({
      ...acc,
      [prop]: slices[prop](acc[prop], action),
    }),
    state
  );
};
