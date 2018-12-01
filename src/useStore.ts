import { useContext } from "react";
import { RxStoreContext } from "./RxStoreContext";

export const useStore = () => {
  const { dispatch, getState, stateSubject$ } = useContext(RxStoreContext);
  return {
    dispatch,
    stateSubject$,
    getState,
  };
};
