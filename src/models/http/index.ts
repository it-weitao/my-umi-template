import { HttpClient, HttpInterceptor } from '@ngify/http'

export const createHttpClientFactory = () => {
  const interceptors = new Set<HttpInterceptor>()
  let httpClient: HttpClient | null = null

  const provide = (providers: HttpInterceptor[]) => {
    providers.forEach((provider) => {
      interceptors.add(provider)
    })
  }

  const getHttp = () => {
    if (!httpClient) {
      httpClient = new HttpClient({ interceptors: [...interceptors.values()] })
    }
    return httpClient
  }

  return {
    provide,
    getHttp,
  }
}
