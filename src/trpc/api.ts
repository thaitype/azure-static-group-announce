import { createTRPCProxyClient, httpLink } from '@trpc/client';
import type { AppRouter } from '../server/api/root';
import { getBaseUrl } from './utils';

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpLink({
      url: getBaseUrl() + "/api/trpc",
      async headers() {
        return {
          'x-trpc-source': "vite-react",
        };
      },
    }),
  ],
});