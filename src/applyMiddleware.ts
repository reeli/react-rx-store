import { compose } from "./utils";

interface IMiddlewareAPI {
  getState: () => any;
  dispatch: (action: any) => any;
}

type TDispatch = (action: any) => any;
export type Middleware = (middlewareAPI: IMiddlewareAPI) => (next: TDispatch) => (action: any) => any;

export const applyMiddleware = (middlewares: Middleware[]) => {
  return (middlewareAPI: IMiddlewareAPI) => {
    const chain = middlewares.map((middleware) => middleware(middlewareAPI));
    const enhancedDispatch = compose(...chain)(middlewareAPI.dispatch);
    return {
      ...middlewareAPI,
      dispatch: enhancedDispatch,
    };
  };
};
