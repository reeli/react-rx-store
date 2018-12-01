import React from "react";
import { BehaviorSubject } from "rxjs";

interface IRxStoreContextValues {
  dispatch: (action: any) => any;
  stateSubject$: BehaviorSubject<any>;
  getState: () => any;
}

export const RxStoreContext = React.createContext<IRxStoreContextValues>({
  dispatch: (_: any) => {},
  getState: () => {},
  stateSubject$: new BehaviorSubject({}),
});
