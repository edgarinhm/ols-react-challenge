// helpers needed when creating zustand middleware
type PopArgument<T extends (...a: never[]) => unknown> = T extends (
  ...a: [...infer A, infer _]
) => infer R
  ? (...a: A) => R
  : never;

type Write<T extends object, U extends object> = Omit<T, keyof U> & U;

type Cast<T, U> = T extends U ? T : U;

type ValidationResult<T> = [boolean, T];

type Optionalize<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type Require<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
type StringValueKeys<T> = { [K in keyof T]: T[K] extends string ? K : never }[keyof T];

type NumberValueKeys<T> = { [K in keyof T]: T[K] extends number ? K : never }[keyof T];
type BooleanValueKeys<T> = { [K in keyof T]: T[K] extends boolean ? K : never }[keyof T];
