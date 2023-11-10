import { connectDB } from "../../../../../config/mongodb";
import { User } from "../../../../../model/User";
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
    const body = await request.json()
    console.log(body)
    if (!body?.email || !body?.password) {
        return Response.json("Invalid credentails", { status: 401 })
        // console.log("reached here")
    }

    await connectDB();
    const user = await User.findOne({ email: body.email });
    console.log("reached here1")
    if (!user) {
        return Response.json('not registered ', { status: 404 })
        console.log("reached here2")
    }
    console.log("reached here3")
    const passwordValid = bcrypt.compareSync(body.password, (user.password).toString());

    if (!passwordValid) {
        return Response.json('Invalid password', { status: 403 })
    }

    const userWithoutPassword = { ...user.toObject() };
    delete userWithoutPassword.password;

    return Response.json(userWithoutPassword , {status:200})
}