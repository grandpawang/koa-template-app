type NonPromise<T> = T extends Promise<infer R> ? R : T;
type Obj = Record<string, any>
