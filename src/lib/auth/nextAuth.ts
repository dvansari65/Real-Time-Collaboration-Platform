import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "../prisma"
import { error } from "console"
import { Session } from "inspector/promises"
import { NextAuthOptions } from "next-auth"



export const authOptions:NextAuthOptions = {
    providers : [
        CredentialsProvider({
            name:"Credentials",
            credentials: {
                userName: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
              },
            async authorize(credentials){
                if(!credentials?.password || !credentials?.userName){
                    return null
                }
                const user = await prisma.user.findUnique({
                    where:{
                        userName:credentials.userName
                    }
                })
                if(!user){
                    throw new Error("user not found!") 
                }
                const bcrypt = await import('bcrypt');
                const isValid = await bcrypt.compare(credentials.password,user.password)
                if(!isValid){
                    throw new Error("password not matched!")
                }
                return {
                    id:user.id.toString(),
                    userName:user.userName.toString()
                }
                
            }
        }),
    ],
    session:{
        strategy:"jwt"
    },
    callbacks:{
        async jwt({token,user}){
            if(token) token.user = user
            return token
        }
    },
    pages:{
        signIn:"/login"
    }
}