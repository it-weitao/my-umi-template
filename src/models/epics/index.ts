import { combineEpics } from 'redux-observable'
import { authEpic } from './auth'

export const rootEpic = combineEpics(authEpic)
