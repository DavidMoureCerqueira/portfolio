export type ResponseModel<T> =
  | { success: true; data: T }
  | { success: false; error: string };