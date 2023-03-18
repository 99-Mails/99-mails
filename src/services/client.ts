import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import fetch from "cross-fetch";

const link = new HttpLink({
  uri: import.meta.env.VITE_API_URI,
  // Use explicit `window.fetch` so that outgoing requests
  // are captured and deferred until the Service Worker is ready.
  fetch: (...args) => fetch(...args),
});

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
