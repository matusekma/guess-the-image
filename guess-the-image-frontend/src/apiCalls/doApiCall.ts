import { AxiosResponse, Method } from "axios";

import { axiosInstance } from "./axiosConfig";

export function doApiCall<T>(
  method: Method,
  url: string,
  params?: any,
  additionalConfig?: any
): Promise<T> {
  return axiosInstance({
    method,
    url,
    data: params,
    ...additionalConfig,
  }).then((res: AxiosResponse<T>) => res.data);
}
