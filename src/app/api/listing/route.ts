import getCurrentUser from '@/utils/getCurrentUser'
import { listing } from '../../../../model/Listings'
import { FormProp } from '@/components/Model/AirBnbMyHome'
import { connectDB } from '../../../../config/mongodb'
import { revalidateTag } from 'next/cache'
import { ObjectId } from 'mongodb'
import { reservations } from '../../../../model/Reservations'




export async function POST(request: Request) {
    try {

        const body: FormProp = await request.json()
        console.log(body)
        // const session = await getServerSession(authOption)
        // console.log(session?.user?.email)
        // return Response.json(session)
        const currentuser = await getCurrentUser()
        if (!currentuser) {
            return Response.json("action not allowed user not loged in ", { status: 404 })
        }

        const bodyonject = { ...body }
        // console.log(bodyonject)
        await connectDB()
        const createListing = new listing({
            Userid: currentuser._id,
            title: body.title,
            description: body.description,
            imageSrc: body.imageSrc,
            category: body.category,
            roomCount: body.roomCount,
            bathroomCount: body.bathroomCount,
            guestCount: body.guestCount,
            locationValue: body.locationValue,
            price: body.price,

        })

        const Listing = await createListing.save()
        revalidateTag('listingCollection')
        console.log(Listing)
        return Response.json(Listing, { status: 200 })

    } catch (err) {
        // console.log(err)
        return Response.json("hmmm")
    }

}


export async function GET(request: Request) {
    
    
    try {

        await connectDB()
        const allListings = await listing.find()
        return Response.json(allListings, { status: 200 })
    } catch (err) {
        // console.log(err)
        return Response.json("internal server error", { status: 500 })
    }

}





