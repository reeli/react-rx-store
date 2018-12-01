import { isEqual } from "lodash";
import { useContext, useLayoutEffect, useState } from "react";
import { distinctUntilChanged, map, tap } from "rxjs/operators";
import { RxStoreContext } from "./RxStoreContext";

interface IUseConnectProps {
  mapStateToProps: (state: any) => any;
}

export const useConnect = ({ mapStateToProps }: IUseConnectProps) => {
  const { stateSubject$ } = useContext(RxStoreContext);
  const [state, setState] = useState<any>({});

  useLayoutEffect(() => {
    const subscription = stateSubject$
      .pipe(
        map(mapStateToProps),
        distinctUntilChanged(isEqual),
        tap((nextState) => {
          setState(nextState);
        }),
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return state;
};
