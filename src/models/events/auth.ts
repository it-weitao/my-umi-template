import { Subject } from 'rxjs'

export const authorizingEvent = new Subject<boolean>()
export const authorizeFailedEvent = new Subject()
