import { connectDB } from "../../../../../config/mongodb"
import { reservations } from "../../../../../model/Reservations"
import { ObjectId } from "mongodb"

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {

        const id = params?.id

        await connectDB()
        if (id) {

            const safeReservationId = new ObjectId(id)
            const listing = await reservations.findById(safeReservationId)
            return Response.json(listing, { status: 200 })
        }
        
        return Response.json("provide an id" , {status: 206})


    } catch (err) {
        // console.log(err)
        return Response.json("internal server error", { status: 500 })
    }

}