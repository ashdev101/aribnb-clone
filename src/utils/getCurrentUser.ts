import { getServerSession } from "next-auth"
import { authOption } from "./authOptions"
import { connectDB } from "../../config/mongodb"
import { User } from "../../model/User"


type Props = {}


export async function getCurrentUser() {

    const session = await getServerSession(authOption)
    console.log(session)
    if (session) {
        // console.log(session.user?.email)

        connectDB()

        const user = await User.findOne({ email: session.user?.email })
        return user
    }

    return null

}

export default getCurrentUser