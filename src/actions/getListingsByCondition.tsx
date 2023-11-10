import { FormProp } from "@/components/Model/AirBnbMyHome"
import { listing } from "../../model/Listings"
import { reservations } from "../../model/Reservations"
import ISODate from "mongodb"
import { connectDB } from "../../config/mongodb"

type searchParamsTypes = {
    startDate?: string
    endDate?: string
    locationValue?: string
    bathroomCount?: string
    roomCount?: string
    guestCount?: string
}

async function getListingsByCondition({
    startDate,
    endDate,
    locationValue,
    bathroomCount,
    roomCount,
    guestCount
}: searchParamsTypes) {

    await connectDB()
    const AllListings = await listing.find()
    // just in case if there is string manupilation we can avoid the error by assigning manually and also if we have query onject we can pass it to find as a Condition

    const listingQuery: any = {}
    const reservationQuery: any = {}
    //@ts-ignore
    const test = new Date(startDate)
    // console.log(startDate) 
    // console.log(endDate)

    if (startDate) { reservationQuery.startDate = { $gte: new Date(startDate) } }
    if (endDate) { reservationQuery.endDate = { $lte: new Date(endDate) } }
    if (locationValue) { listingQuery[`locationValue.name`] = locationValue }
    if (bathroomCount) { listingQuery.bathroomCount = { $gte: Number(bathroomCount) } }
    if (roomCount) { listingQuery.roomCount = { $gte: Number(roomCount) } }
    if (guestCount) { listingQuery.guestCount = { $gte: Number(guestCount) } }
    // console.log(reservationQuery)
    // sience in the database listing is different and reservations are different collections we will essentaillay have to make two queries  

    //reservations where users searchcriteria falls between the already booked reservations
    const NonAvailbleReservationResult: any = await reservations.find(reservationQuery)
    // console.log(NonAvailbleReservationResult)

    const listingResult: any = await listing.find(listingQuery)
    // console.log(listingResult)

    // console.log(reservationQuery)

    const finalResult = listingResult.filter((listing: any) => {
        const HasReservation = NonAvailbleReservationResult.some((reservation: any) => (listing._id).toString() === (reservation.listingid).toString())
        if (HasReservation) {
            // console.log(true)
            return false
        }
        return listing
    })

    // console.log(finalResult)

    return { NonAvailbleReservationResult, listingResult, finalResult ,listingQuery , reservationQuery }
}

export default getListingsByCondition