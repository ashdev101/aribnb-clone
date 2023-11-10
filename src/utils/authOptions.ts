import axios from "axios"
import NextAuth, { AuthOptions, getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


export const authOption: AuthOptions = ({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }

            },
            async authorize(credentials) {
                try{
                    // console.log(credentials)
                // console.log('started ')
                const authResponse = await axios.post("http://localhost:3000/api/auth/login", credentials)
                

                if (authResponse.status != 200) {
                    throw new Error("someting went wrong")
                }
                // console.log(authResponse.data)
                const user = authResponse.data
                
                return user
                }catch(err){
                    // console.log(err)
                }
            },
        }),
    ],
})


export const getUserSession = ()=> getServerSession()

