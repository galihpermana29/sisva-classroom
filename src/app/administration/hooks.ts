import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

export const useAdministrationDispatch = useDispatch.withTypes<AppDispatch>();
export const useAdministrationSelector = useSelector.withTypes<RootState>();
