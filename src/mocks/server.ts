import { setupServer } from 'msw/node'
import { handlers } from './handlers'
// This configures a Service Worker with the given request handlers.
export const server = setupServer(...handlers)

server.events.on('request:start', (req) => {
  console.log(req.method, req.url.href)
})

server.events.on('request:unhandled', (req) => {
  console.log('%s %s has no handler', req.method, req.url.href)
})
