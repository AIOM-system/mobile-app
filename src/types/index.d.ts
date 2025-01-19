export interface IHttpRequestConfig {
  server: {
    api: string;
    baseUrl: string;
    version: string;
    headers: Record<string, any>;
  };
}

export interface IExtraConfig {
  apiVersion: string;
  headers: Record<string, any>;
}

export interface IHttpResponse<T = any> {
  statusCode: number;
  data: T | null;
  success: boolean;
  message: string;
  metadata?: any;
}

export interface User {
  id: string;
  username: string;
  role: string;
}

export interface IBaseItem {
  label: string;
  value: string;
}