import { NextAuthOptions } from "next-auth";
import  CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials){
        if(!credentials?.email || !credentials?.password){
          throw new Error("Email or password is missing")
        }

        try {
          await 
        } catch (error) {
          
        }
      }
    })
  ]
}