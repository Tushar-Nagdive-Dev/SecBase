/*./src/app/core/interfaces/apo-client.interface.ts*/
import {HttpContext, HttpHeaders, HttpParams} from '@angular/common/http';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  timestamp: string;
}

export interface ApiRequestOptions {
  params?: ApiParams;
  headers?: ApiHeaders;
  context?: HttpContext;
  withCredentials?: boolean;
  reportProgress?: boolean;
}

export type ApiParamsValue = string | number | boolean | null | undefined;

export type ApiParams = HttpParams | Record<string, string>;

export type ApiHeaders = HttpHeaders | Record<string, string>;


