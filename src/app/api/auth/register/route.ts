import { connectDB } from "../../../../../config/mongodb"
import { User } from "../../../../../model/User"
import bcrypt from 'bcrypt'

type bodyPorp = {
    name: string
    email: string
    password: string

}

export async function POST(request: Request) {
    try{
        const body: bodyPorp = await request.json()
    if (!body.email || !body.password) return Response.json("invalid credentails", { status: 400 })
    await connectDB()
    const EmailExists = await User.findOne({ email: body.email })
    // const PhoneExists = await  user.findOne({phone : body.phone})
    if (EmailExists) return Response.json("email already registered , try Log in", { status: 409 })
    // if(PhoneExists) return Response.json("phone already registered , use different phone number" , {status :409})

    //hasing password 
    const saltRounds = 10
    const hashedPassword = bcrypt.hashSync(body.password, saltRounds);
    const user = new User({
        name: body.name,
        email: body.email,
        password: hashedPassword,
    })

    const newUser = await user.save()

    const user_id = newUser._id
    // console.log(user_id)

    //create other fields as well 
    return Response.json(newUser, { status: 201 })
    }catch(err){
        // console.log(err)
        return Response.json("internal server error pls try after some time" , {status:500})
    }
}