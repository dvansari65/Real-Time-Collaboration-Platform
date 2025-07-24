import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "../prisma"
import { NextAuthOptions } from "next-auth"




export const authOptions:NextAuthOptions = {
    providers : [
        CredentialsProvider({
            name:"Credentials",
            credentials: {
                userName: { label: "Username", type: "text", placeholder: "username" },
                password: { label: "Password", type: "password" , placeholder:"password"}
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
    secret:process.env.NEXTAUTH_SECRET,
    session:{
        strategy:"jwt"
    },
    callbacks:{
        async jwt({token,user}){
            if(token) token.user = user
            return token
        }
    }
}