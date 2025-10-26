import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isOnLogin = nextUrl.pathname.startsWith("/admin/login");
      
      if (isOnAdmin && !isOnLogin) {
        if (isLoggedIn) return true;
        return false;
      }
      
      if (isLoggedIn && isOnLogin) {
        return Response.redirect(new URL("/admin", nextUrl));
      }
      
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
