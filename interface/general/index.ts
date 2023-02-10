export type ICallback<T = any> = (data?: any) => T;

export interface ISnackbarProps {
  error?: string;
  success?: string;
}
