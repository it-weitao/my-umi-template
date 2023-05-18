import { Epic, combineEpics } from 'redux-observable'
import { catchError, filter, finalize, map, mergeMap, of, switchMap } from 'rxjs'
import { empty } from '../actions'
import { authorize, authorized, initialAuth, unauthorize, unauthorized } from '../actions/auth'
import { login, logout } from '../apis/auth'
import { authorizeFailedEvent, authorizingEvent } from '../events/auth'
import { EpicDependencies } from '../index'

const initialAuthEpic: Epic = (action$) => {
  const authStorage$ = of({
    token: localStorage.getItem('token'),
    visitingUrl: localStorage.getItem('visitingUrl'),
  })

  return action$.pipe(
    filter(initialAuth.match),
    mergeMap(() =>
      authStorage$.pipe(
        map(({ token, visitingUrl }) => {
          if (token) return authorized({ token })
          if (visitingUrl) return unauthorize({ visitingUrl })
          return empty()
        }),
      ),
    ),
  )
}

const authorizeEpic: Epic = (action$, state$, { getHttp }: EpicDependencies) => {
  return action$.pipe(
    filter(authorize.match),
    switchMap(({ payload }) => {
      authorizingEvent.next(true)
      return login(getHttp(), payload).pipe(
        map(({ token }) => authorized({ token })),
        catchError((err) => {
          authorizeFailedEvent.next(err)
          return of(empty())
        }),
        finalize(() => authorizingEvent.next(false)),
      )
    }),
  )
}

const unauthorizeEpic: Epic = (action$, state$, { getHttp }: EpicDependencies) => {
  return action$.pipe(
    filter(unauthorize.match),
    switchMap(({ payload }) =>
      logout(getHttp()).pipe(
        map(() => unauthorized({ ...payload })),
        catchError(() => of(empty())),
      ),
    ),
  )
}

export const authEpic = combineEpics(initialAuthEpic, authorizeEpic, unauthorizeEpic)
