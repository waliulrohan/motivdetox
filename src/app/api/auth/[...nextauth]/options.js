import dbConnect from '@/lib/dbconnect';
import UserModel from '@/model/User';
import  bcrypt from 'bcrypt';
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions ={
    providers: [
        CredentialsProvider({
          id: "credentials",
          name: "Credentials",

          credentials: {
            email: { label: "Email", type: "text"},
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req){
            dbConnect()
            try {
                const user = await UserModel.findOne({
                    $or: [
                        {email : credentials.identifier},
                        {username : credentials.identifier}
                    ]
                })
                if (!user) {
                    throw new Error("Invalid credential!")
                }
                if (!user.isVerified) {
                    throw new Error("Please verify your account!")
                }

                const isValidPassword = await bcrypt.compare(credentials.password , user.password)

                if (isValidPassword) {
                    return user;
                }else{
                    throw new Error("Incorrect password")
                }

            } catch (error) {
                throw new Error(error)
            }
          }
        })
      ],
      callbacks: {
        async jwt({ token, user}) {
              if(user){
                  token._id = user._id?.toString();
                  token.isVerified = user.isVerified;
                  token.username = user.username;
                }
                return token
            },
        async session({ session,token }) {
            if(token){
                session.user.isVerified = token.isVerified;
                session.user.username = token.username;
                session.user._id = token._id;
            }
            return session
          },
      },
     pages: {
        signIn: '/auth/signin'
     },
     session: {
        strategy:'jwt'
     },
     secret: process.env.NEXTAUTH_SECRET,
}