import { HttpClient } from '@ngify/http'

export interface LoginData {
  account: string
  password: string
}

export interface LoginResponse {
  token: string
}

export const login = (http: HttpClient, data: LoginData) => {
  return http.post<LoginResponse>('/v1/login', data)
}

export const logout = (http: HttpClient) => {
  return http.post('/v1/logout')
}
