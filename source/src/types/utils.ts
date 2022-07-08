export type Nullable<T> = T | null;
export type NullableTypes<T> = { [P in keyof T]: T[P] | null };
export type ReturnAsyncType<T extends (...args: any) => any> = Awaited<
  ReturnType<T>
>;
