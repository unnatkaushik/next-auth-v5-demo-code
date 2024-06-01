import NextAuth from "next-auth";
import github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const res = await fetch(
          "https://r2api.visionarytechsol.com/account-api/user-login/",
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();

        if (user.success) {
          // Any object returned will be saved in `user` property of the JWT

          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (user?.success) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        return {
          ...token,
          username: user.username,
          accessToken: user.access,
          userid: user.user_uid,
        };
      }
      return token;
    },
    async session({ token, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
          accessToken: token.accessToken,
          userid: token.userid,
        },
      };
    },
  },
});
