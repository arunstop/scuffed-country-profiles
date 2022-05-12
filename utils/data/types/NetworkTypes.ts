export interface NetworkResponse<T> {
  ok: boolean;
  status: number;
  message: string;
  data: T;
}

// null = initial value
// T = data from api
// Error = when error
export type NetworkData<T> = null | T | string;
