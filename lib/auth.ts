/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from "next-auth";
import  CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";
import User from "@/models/Users";
import bcrypt from "bcryptjs";

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
          await connectToDatabase()
          const user = await User.findOne({email: credentials.email})

          if(!user){
            throw new Error("No user found")
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if(!isValid){
            throw new Error("Invalid password")
          }

          return {
            id: user._id.toString(),
            email: user.email
          }
        } catch (error : any) {
          throw new Error(error.message || 'Something went wrong')
        }
      }
    })
  ],
  callbacks: {
    async jwt({token, user}){
      if(user){
        token.id = user.id
      }
      return token
    },
    async session({session, token}){
      if(session.user){
        session.user.id = token.id as string
      }
      return session
    }
  },
  session:{
    strategy: "jwt"
  }
}