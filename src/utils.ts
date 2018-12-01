type TFunction = (...args: any[]) => any;

export const compose = (...funcs: TFunction[]) => {
  if (funcs.length === 0) {
    return (args: any) => args;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return (...args: any[]) => funcs.reduce((a, b) => a(b(...args)));
};
