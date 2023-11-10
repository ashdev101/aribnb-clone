import mongoose, { Schema } from "mongoose"


const ListingSchema = new Schema({
    Userid: { type: String },
    title: { type: String },
    description: { type: String },
    imageSrc: { type: String },
    category: { type: String },
    roomCount: { type: Number },
    bathroomCount: { type: Number },
    guestCount: { type: Number },
    locationValue: { type: Object , default : {} },
    price: { type: Number },
    reservations: { type: Array, default: [] },
    heartlist : {type: Array , default : []}
}, { timeStamp: true })


export const listing = mongoose.models.listings || mongoose.model("listings" ,ListingSchema )