import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import User from "./models/user.model";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
        credentials: {
          email: { label: "Email",type:'email' },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if(!credentials?.email && !credentials?.password){
            return null;
          }
          const user = await User.findOne({email})
          if(!user){
            throw new Error("User is not found");
          }
          if (!response.ok) return null
          return (await response.json()) ?? null
        },
      }),
  ],
})