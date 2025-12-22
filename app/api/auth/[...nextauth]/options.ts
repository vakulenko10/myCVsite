import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions } from 'next-auth';

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      profile(profile) {
        let userRole: string = 'Google User';
        if (profile?.email === process.env.ADMINEMAIL) {
          userRole = 'admin';
          return {
            ...profile,
            id: profile.sub,
            role: userRole,
          };
        } else if (profile?.email !== process.env.ADMINEMAIL) {
          console.log('Access Denied: Only admin users allowed to sign into admin dashboard.');
          return null;
        }
        return null;
      },
      clientId: process.env.Google_ID || '',
      clientSecret: process.env.Google_Secret || '',
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};


