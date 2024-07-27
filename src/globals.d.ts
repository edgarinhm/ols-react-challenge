type Optionalize<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type StringValueKeys<T> = { [K in keyof T]: T[K] extends string ? K : never }[keyof T];
type NumberValueKeys<T> = { [K in keyof T]: T[K] extends number ? K : never }[keyof T];
type BooleanValueKeys<T> = { [K in keyof T]: T[K] extends boolean ? K : never }[keyof T];
