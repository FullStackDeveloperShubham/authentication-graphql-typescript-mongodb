import bcrypt from "bcryptjs"
import mongoose, { Document, Model, Schema } from "mongoose"
import type { IUser } from "../Types/user.Types"

interface UserDocument extends IUser, Document { }

// ! Define the schema
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

// ! Hash the Password 
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const User: Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>("User", userSchema)
export default User