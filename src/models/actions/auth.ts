import { createAction } from '@reduxjs/toolkit'
import { LoginData } from '../apis/auth'

const PREFIX = 'auth'

export const initialAuth = createAction(`${PREFIX}/initialAuth`)
export const authorize = createAction<LoginData>(`${PREFIX}/authorize`)
export const authorized = createAction<{ token: string }>(`${PREFIX}/authorized`)
export const unauthorize = createAction<{ visitingUrl: string }>(`${PREFIX}/unauthorize`)
export const unauthorized = createAction<{ visitingUrl: string }>(`${PREFIX}/unauthorized`)
