import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handle = createMiddleware(routing);

// Next.js 16 renamed `middleware.ts` to `proxy.ts`; this file replaces the
// old middleware.ts convention next-intl's docs usually ask for.
export function proxy(request) {
  return handle(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
