import { useEffect } from 'react'
import { Subject } from 'rxjs'

export const useEvent = <T = unknown>(event: Subject<T>, cb: (data: T) => void) => {
  useEffect(() => {
    const subscription = event.subscribe(cb)
    return () => {
      subscription.unsubscribe()
    }
  }, [cb, event])
}
