import type { NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const expectedUsername = process.env.ADMIN_USERNAME;
    const expectedPassword = process.env.ADMIN_PASSWORD;

    if (!expectedUsername || !expectedPassword) {
      return new Response("Administration non configurée.", {
        status: 503,
        headers: { "Cache-Control": "no-store" },
      });
    }

    const authorization = request.headers.get("authorization");
    const encodedCredentials = authorization?.startsWith("Basic ")
      ? authorization.slice(6)
      : null;

    let isAuthorized = false;

    if (encodedCredentials) {
      try {
        const decodedCredentials = atob(encodedCredentials);
        const separatorIndex = decodedCredentials.indexOf(":");
        const username = decodedCredentials.slice(0, separatorIndex);
        const password = decodedCredentials.slice(separatorIndex + 1);

        isAuthorized =
          separatorIndex > 0 &&
          username === expectedUsername &&
          password === expectedPassword;
      } catch {
        isAuthorized = false;
      }
    }

    if (!isAuthorized) {
      return new Response("Authentification requise.", {
        status: 401,
        headers: {
          "Cache-Control": "no-store",
          "WWW-Authenticate": 'Basic realm="Carte Google Avis", charset="UTF-8"',
        },
      });
    }
  }

  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
