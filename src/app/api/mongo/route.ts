import { connectDB } from "../../../../config/mongodb"
import { account } from "../../../../model/Accounts"
import { listing } from "../../../../model/Listings"
import { reservations } from "../../../../model/Reservations"
import { User } from "../../../../model/User"
import { ObjectId } from 'mongodb'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get("date")
    const test = searchParams.get("test")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")
    // console.log(startDate)
    // console.log(endDate)
    const query: any = {}
    
    if (startDate) { query.startDate = { $gte: new Date(startDate) } }
    if (endDate) { query.endDate = { $lte: new Date(endDate) } }
    
    await connectDB()
    if (date) {
        const data = await reservations.find({ "startDate": { $gt: new Date(date) } })
        return Response.json(data, { status: 200 })
    }

    if (startDate && endDate) {
        const data = await reservations.find(query)
        return Response.json(data, { status: 200 })
    }

    
    // console.log(query)

    return Response.json("ok", { status: 200 })
}

export async function POST(request: Request) {
    const res = await request.json()
    // console.log(res)
    await connectDB()
    const data = new User(res)
    const saved_data = await data.save()
    // console.log(saved_data._id)

    const account_entry = new account({
        "Userid": saved_data._id

    })

    const saved_account_entry = await account_entry.save()


    return Response.json(saved_account_entry, { status: 200 })
}


export async function PUT(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        // console.log(searchParams.get("id"))
        const body = await request.json()
        // console.log(body)
        await connectDB()
        // const findAccount = await account.find({Userid :searchParams.get("id") })
        const foundAccount = await account.findOneAndUpdate({ Userid: searchParams.get("id") }, { $set: body }, { new: true })
        // console.log(foundAccount)

        return Response.json({ message: "you are into the correct feild but in PATCH ", foundAccount }, { status: 200 })
    } catch (err) {
        // console.log(err)
        return Response.json({ message: "internal server error" }, { status: 500 })
    }
}


