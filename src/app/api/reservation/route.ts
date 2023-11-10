import { connectDB } from '../../../../config/mongodb'
import { listing } from '../../../../model/Listings'
import { reservations } from '../../../../model/Reservations'
import { ObjectId } from 'mongodb'

export async function POST(request: Request) {

    try {

        const body = await request.json()
        // console.log(body)

        //its good to check for the required feils before processing but for now i am skiping that
        await connectDB()
        const newReservation = new reservations(body)
        const savedReservation = await newReservation.save()

        const reservationId = savedReservation._id
        const safeListingId = new ObjectId(body.listingid)
        const RespectiveListing = await listing.findById(safeListingId)

        RespectiveListing.reservations.push(reservationId)
        const saveListing = await RespectiveListing.save()

        return Response.json("succesfully created reservation", { status: 201 })



    } catch (err) {
        // console.log(err)
        return Response.json("internal server error", { status: 500 })
    }
}


export async function GET(request: Request) {

    try {
        const url = new URL(request.url)
        if (url.searchParams.has("list_id")) {
            await connectDB()
            // url.searchParams.get("reser_id")
            //@ts-ignore
            const safeReservationId = new ObjectId(url.searchParams.get("list_id"))
            const allListingsByReservationId = await reservations.find({
                "listingid": url.searchParams.get("list_id")
            })

            return Response.json(allListingsByReservationId, { status: 200 })
        }
        await connectDB()
        const listing = await reservations.find()
        return Response.json(listing, { status: 200 })

    } catch (err) {
        // console.log(err)
        return Response.json("internal server error", { status: 500 })
    }
}