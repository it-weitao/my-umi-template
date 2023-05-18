import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@ngify/http'
import { tap } from 'rxjs'
import { unauthorized } from '../actions/auth'
import { Store } from '../index'

export class RequestInterceptor implements HttpInterceptor {
  constructor(private request: Partial<HttpRequest<unknown>>, private baseUrl?: string) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    const modified = request.clone({
      ...this.request,
      url: this.baseUrl ? `${this.baseUrl}${request.url}` : request.url,
    })
    return next.handle(modified)
  }
}

export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  private getTokenByStore = () => {
    const { authReducer } = this.store.getState()
    return authReducer.type === 'authorized' ? authReducer.token : undefined
  }

  private unauthorize = (href: string) => {
    this.store.dispatch(unauthorized({ visitingUrl: href }))
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    const modified = request.clone({
      headers: request.headers.set('Authorize', `Bearer ${this.getTokenByStore()}`),
    })
    return next.handle(modified).pipe(
      tap((response) => {
        if (response.type === HttpEventType.Response) {
          const { href } = location
          this.unauthorize(href)
        }
      }),
    )
  }
}

export class ErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    return next.handle(request).pipe(
      tap((response) => {
        if (response.type === HttpEventType.Response) {
        }
      }),
    )
  }
}
