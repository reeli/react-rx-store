import {get, size} from "lodash";
import React from "react";
import {BehaviorSubject} from "rxjs";
import {applyMiddleware, Middleware} from "./applyMiddleware";
import {RxStoreContext} from "./RxStoreContext";

interface IBasicMeta {
    groupKey?: string;
    reducer?: (state: any, action: any) => any;
}

interface IAction<TPayload, TMeta extends IBasicMeta> {
    type: string;
    payload: TPayload;
    meta?: TMeta;
}

interface IRxStoreProps {
    children: any;
    middlewares?: Middleware[];
}

export const RxStore = (props: IRxStoreProps) => {
    const stateSubject$ = new BehaviorSubject({});

    let dispatch;

    dispatch = <TPayload, TMeta>(action: IAction<TPayload, TMeta>) => {
        const reducer = get(action, "meta.reducer");
        const groupKey = get(action, "meta.groupKey");
        const currentState = stateSubject$.getValue();

        stateSubject$.next({
            ...currentState,
            [groupKey]: reducer(currentState, action),
        });
    };

    let middlewareAPI = {
        dispatch,
        getState: () => stateSubject$.getValue(),
    };

    if (size(props.middlewares) > 0) {
        middlewareAPI = applyMiddleware(props.middlewares!)(middlewareAPI);
    }

    return (
        <RxStoreContext.Provider
            value={{
                ...middlewareAPI,
                stateSubject$,
            }}
            children={props.children}
        />
    );
};
