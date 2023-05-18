import { useEvent } from '@/hooks/event'
import { useAppDispatch } from '@/hooks/model'
import { authorize } from '@/models/actions/auth'
import { authorizeFailedEvent, authorizingEvent } from '@/models/events/auth'
import { useState } from 'react'

const Login = () => {
  const dispatch = useAppDispatch()

  const [isLoading, setIsLoading] = useState(false)

  const login = () => {
    const data = { account: '', password: '' }
    dispatch(authorize(data))
  }

  useEvent(authorizeFailedEvent, console.log)
  useEvent(authorizingEvent, (v) => {
    console.log(v)
    setIsLoading(v)
  })

  return (
    <button type="submit" onClick={login}>
      {`${isLoading}`}
    </button>
  )
}

export default Login
