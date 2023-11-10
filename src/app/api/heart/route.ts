import getCurrentUser from "@/utils/getCurrentUser";
import { listing } from "../../../../model/Listings";
import { connectDB } from "../../../../config/mongodb";
import { ObjectId } from 'mongodb';
import { User } from "../../../../model/User";



export async function POST(request: Request) {
    try {
        // console.log("we were called")
        const listingId = await request.json()
        // console.log(listingId)
        if (!listingId) {
            return Response.json("invalid id", { status: 403 })
        }

        const currentuser = await getCurrentUser()
        // console.log(currentuser)
        if (!currentuser) {
            // console.log("this was executed")
            return Response.json("action not allowed kindly login ", { status: 401 })
        }

        await connectDB()
        const objectIdListingId = new ObjectId(listingId);
        const currentlisting = await listing.findById(objectIdListingId)
        // console.log(currentlisting)
        currentlisting.heartlist.push(currentuser._id)
        const savedcurrentlisting = await currentlisting.save()

        //aslo add the current listing in the user's favourite Id
        const safeUserId = new ObjectId(currentuser._id)

        //@ts-ignore
        const _User = await User.findById(safeUserId)
        _User.favourateIds.push(savedcurrentlisting._id)
        await _User.save()

        return Response.json("hearted succesfully ", { status: 200 })


    } catch (err) {
        // console.log(err)
        return Response.json("internal server error", { status: 500 })
    }
}


export async function PUT(request: Request) {

    try {
        // console.log("we were called")
        const listingId = await request.json()
        // console.log(listingId)

        if (!listingId) {
            return Response.json("invalid id", { status: 403 })
        }

        const currentuser = await getCurrentUser()
        // console.log(currentuser)
        if (!currentuser) {
            return Response.json("action not allowed kindly login ", { status: 401 })
        }

        await connectDB()
        const objectIdListingId = new ObjectId(listingId);
        const currentlisting = await listing.findById(objectIdListingId)
        currentlisting.heartlist = await currentlisting.heartlist.filter((item: any) => (item).toString() !== (currentuser._id).toString())
        const savedcurrentlisting = await currentlisting.save()

        //aslo remove the current listing in the user's favourite Id
        const safeUserId = new ObjectId(currentuser._id)

        //@ts-ignore
        const _User = await User.findById(safeUserId)
        _User.favourateIds = _User.favourateIds.filter((item:any) => (item).toString() !==( savedcurrentlisting._id).toString() )
        await _User.save()

        return Response.json("heart removed succesfully ", { status: 200 })

    } catch (err) {
        // console.log(err)
        return Response.json("internal server error", { status: 500 })
    }
}
