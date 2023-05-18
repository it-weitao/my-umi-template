import { HttpClient } from '@ngify/http'
import { configureStore } from '@reduxjs/toolkit'
import { createEpicMiddleware } from 'redux-observable'
import { rootEpic } from './epics'
import { createHttpClientFactory } from './http/index'
import { AuthInterceptor, ErrorInterceptor, RequestInterceptor } from './http/interceptor'
import { rootReducer } from './reducers'

export interface EpicDependencies {
  getHttp: () => HttpClient
}

const { provide, getHttp } = createHttpClientFactory()

const epicMiddleware = createEpicMiddleware({ dependencies: { getHttp } as EpicDependencies })

export const store = configureStore({
  reducer: rootReducer,
  middleware: [epicMiddleware],
})

epicMiddleware.run(rootEpic)
provide([new RequestInterceptor({}, ''), new AuthInterceptor(store), new ErrorInterceptor()])

export type Store = typeof store
export type RootState = ReturnType<Store['getState']>
export type AppDispatch = Store['dispatch']
