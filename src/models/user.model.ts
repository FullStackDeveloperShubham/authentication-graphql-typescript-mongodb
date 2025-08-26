import mongoose, { Document, Model, Schema } from "mongoose"
import type { IUser } from "../Types/user.Types"

interface UserDocument extends IUser, Document { }

const userSchema = new Schema<UserDocument>({
    UserName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true })

const User: Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>("User", userSchema)
export default User