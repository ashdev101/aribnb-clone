import NextAuth, { AuthOptions, getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'
import axios from "axios"
import { authOption } from "@/utils/authOptions"


// const handler = ()=> NextAuth({
//     providers: [
//         CredentialsProvider({
//             name : "credentials",
//             credentials: {
//                 email: { label: 'email', type: 'text' },
//                 password: { label: 'password', type: 'password' }

//             },
//             async authorize(credentials) {
//                 if (!credentials?.email || !credentials?.password) {
//                     throw new Error("Invalid credentials");
//                     console.log("reached here")
//                 }

//                 await connectDB();
//                 const user = await User.findOne({ email: credentials.email });
//                 console.log("reached here1")
//                 if (!user) {
//                     throw new Error("User not found. Please try registering.");
//                     console.log("reached here2")
//                 }
//                 console.log("reached here3")
//                 const passwordValid = bcrypt.compareSync(credentials.password, (user.password).toString());

//                 if (!passwordValid) {
//                     console.log("reached here4")
//                     throw new Error('Invalid password');
//                 }
//                 console.log("reached here5")
//                 return user

//             },
//         }),
//     ],

// })

// export { handler as GET, handler as POST }



// exporting authoptions cause need to pass it in getServerSession to acess the current user details in the server side 


const handler = NextAuth(authOption)


export { handler as GET, handler as POST }
