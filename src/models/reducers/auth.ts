import { createReducer } from '@reduxjs/toolkit'
import { authorized, unauthorized } from '../actions/auth'

interface Unauthorized {
  type: 'unauthorized'
  visitingUrl: string
}
interface Authorized {
  type: 'authorized'
  token: string
}
type AuthState = Authorized | Unauthorized

const initialAuthState: AuthState = {
  type: 'unauthorized',
  visitingUrl: '/',
}

export const authReducer = createReducer<AuthState>(initialAuthState, (builder) => {
  builder.addCase(unauthorized, (state, { payload }) => {
    return { type: 'unauthorized', visitingUrl: payload.visitingUrl }
  })
  builder.addCase(authorized, (state, { payload }) => {
    return { type: 'authorized', token: payload.token }
  })
})
