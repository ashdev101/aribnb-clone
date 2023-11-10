import { connectDB } from "../../../../../config/mongodb"
import { listing } from "../../../../../model/Listings"

type Props = {
    params: {
        id: string
    }
}

export async function GET(request: Request, { params: { id } }: Props) {

    // console.log(id)
    try {

        await connectDB()


        const listingbyId = await listing.findById(id)
        return Response.json(listingbyId, { status: 500 })



    } catch (err) {
        // console.log(err)
        return Response.json("internal sever error", { status: 500 })
    }

}