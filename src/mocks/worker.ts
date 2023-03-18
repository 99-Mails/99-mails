import { setupWorker } from 'msw'
import { handlers } from './handlers'
// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers)

worker.events.on('request:start', (req) => {
  console.log(req.method, req.url.href)
})

worker.events.on('request:unhandled', (req) => {
  console.log('%s %s has no handler', req.method, req.url.href)
})
