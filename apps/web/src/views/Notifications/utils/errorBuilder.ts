import { EventInformation } from '../types'

export const errorBuilder = (subscriptionEvent: EventInformation, error: any) =>
  error instanceof Error && error?.message
    ? subscriptionEvent.message?.(error.message)
    : subscriptionEvent.message?.(JSON.stringify(error))
