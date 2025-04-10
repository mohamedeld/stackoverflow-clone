import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "./models/user.model";
import { connnectToDB } from "./lib/database";

declare module "next-auth"{
  interface Session{
    user:{
      _id:string;
      name:string;
      username:string;
      email:string;
      picture:string;
      location:string;
      reputation:number;
      saved:string[];
    }
  }
}


export const authConfig = {
  providers: [
    Credentials({
        name:"credentials",
        credentials:{
          username:{label:"Username",type:"text",placeholder:"Username"},
          email:{label:"Email",type:"email",placeholder:"Email"},
          password:{label:"Password",type:"password",placeholder:"Password"}
        },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          await connnectToDB();
          const user = await User.findOne({ email: credentials.email });
          
          if (!user) {
            const hashPassword = await bcrypt.hash(credentials?.password as string, 10);
            const newUser = await User.create({
              username: credentials.username,
              email: credentials.email,
              password: hashPassword,
            });
            return newUser;
          }

          const isMatch = await bcrypt.compare(credentials?.password as string, user.password);
          if (!isMatch) {
            return null;
          }
          return user;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
  callbacks: {
    async jwt({ token, user }:any) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }:any) {
      if (token?.user) {
        session.user = token.user;
      }
      return session;
    },
    async authorized({ request, auth }:any) {
      const protectedRoutes = [
         /^\/$/,  
        /\/products/,
        /\/categories/,
        /\/brands/,
        /\/sizes/,
        /\/colors/,
        /\/home/
      ];

      const { pathname } = request.nextUrl;

      if (protectedRoutes.some((route) => pathname.match(route)) && !auth) {
        return Response.redirect(new URL('/login', request.nextUrl));
      }

      if (pathname.startsWith("/login") && auth) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return true;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;