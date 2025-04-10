import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import User from "./models/user.model";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
        credentials: {
            username: { label: "Username",type:'text' },
          email: { label: "Email",type:'email' },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if(!credentials?.username || !credentials?.email || !credentials?.password){
            return null;
          }
          const user = await User.findOne({email:credentials?.email})
          if(!user){
            const hashPassword = await bcrypt.hash(credentials?.password as string,10)
           const newUser =  await User.create({
                username:credentials?.username,
                email:credentials?.email,
                password:hashPassword,
           })
           return newUser
          }
          const isMatch= await bcrypt.compare(credentials?.password as string,user?.password);
          if(!isMatch){
            throw new Error("Invalid credentials");
          }

          return user ?? null;
        },
      }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    authorized({ request, auth }) {  
      const protectedRoutes = [
        /\/products/,
        /\/categories/,
        /\/brands/,
        /\/sizes/,
        /\/colors/,
        /\/home/
      ];

      const { pathname } = request.nextUrl;

      if (protectedRoutes?.some((route) => pathname.match(route)) && !auth) {
        return Response.redirect(new URL('/login', request.nextUrl));
      }

      
      // Handle authentication for login/register pages
      if (pathname.startsWith("/login")) {
        if (auth) {
          // If user is already logged in, redirect to appropriate page
          return Response.redirect(new URL("/", request.nextUrl));
        }

        return true; // Allow access to login pages if not authenticated
      }      
      return true; // Allow access to public routes
    },
    async session({ session, token }: any) {
      if (token) {
        session.user = token?.user;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.AUTH_SECRET,
})