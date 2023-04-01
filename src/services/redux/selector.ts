import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from "react-redux";
import { RootState } from "./reducer";

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
