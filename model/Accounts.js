import mongoose, { Schema } from "mongoose";


const AccountSchema = new Schema({
    Userid: { type: String },
    type: { type: String },
    provider: { type: String },
    providerAccountId: { type: String },
    refresh_token: { type: String },
    access_token: { type: String },
    expires_at: { type: Number },
    token_type: { type: String },
    scope: { type: String },
    id_token: { type: String },
    session_state: { type: String }
})

export const account = mongoose.models.accounts || mongoose.model("accounts", AccountSchema)

