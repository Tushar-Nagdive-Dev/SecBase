/* ./src/app/core/api-client.service.ts */
import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ApiRequestOptions, ApiResponse} from './interfaces/api-client.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiClient {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl.replace(/\/+$/, '');

  private buildUrl(path: string): string {
    const cleanPath = path.replace(/^\/+/, '');
    return `${this.baseUrl}/${cleanPath}`;
  }

  private buildParams(params?: ApiRequestOptions['params']): HttpParams | undefined {
    if (!params) {
      return undefined;
    }
    if (params instanceof HttpParams) {
      return params;
    }
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if(value !== null && value !== undefined) {
        httpParams = httpParams.set(key, String(value));
      }
    });
    return httpParams;
  }

  get<T>(path: string, options?: ApiRequestOptions): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(this.buildUrl(path), {...options, params: this.buildParams(options?.params)});
  }

  post<TResponse, TRequest = unknown>(path: string, body?: TRequest, options?: ApiRequestOptions): Observable<ApiResponse<TResponse>>{
    return this.http.post<ApiResponse<TResponse>>(this.buildUrl(path), body, {...options, params: this.buildParams(options?.params)});
  }

  put<TResponse, TRequest = unknown>(path: string, body?: TRequest, options?: ApiRequestOptions): Observable<ApiResponse<TResponse>> {
    return this.http.put<ApiResponse<TResponse>>(this.buildUrl(path), body, {...options, params: this.buildParams(options?.params)});
  }

  patch<TResponse, TRequest = unknown>(path: string, body?: TRequest, options?: ApiRequestOptions): Observable<ApiResponse<TResponse>> {
    return this.http.patch<ApiResponse<TResponse>>(this.buildUrl(path), body, {...options, params: this.buildParams(options?.params)});
  }

  delete<T = null>(path: string, options?: ApiRequestOptions): Observable<ApiResponse<T>> {
    return this.http.delete<ApiResponse<T>>(this.buildUrl(path), {...options, params: this.buildParams(options?.params)});
  }

  head<T = unknown>(path: string, options?: ApiRequestOptions): Observable<T> {
    return this.http.head<T>(this.buildUrl(path), {...options, params: this.buildParams(options?.params)});
  }

  getBlob(path: string, options?: ApiRequestOptions): Observable<Blob> {
    return this.http.get(this.buildUrl(path), {...options, params: this.buildParams(options?.params,), responseType: 'blob'});
  }

  getText(path: string, options?: ApiRequestOptions): Observable<string> {
    return this.http.get(this.buildUrl(path), {...options, params: this.buildParams(options?.params,), responseType: 'text'});
  }
}
