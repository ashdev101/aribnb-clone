import mongoose, { Schema } from "mongoose";



const ReservationSchema = new Schema({
  listingid: { type: String },
  Userid: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  totalPrice: { type: Number }
}, { timeStamp: true })


export const reservations = mongoose.models.reservations || mongoose.model("reservations", ReservationSchema)