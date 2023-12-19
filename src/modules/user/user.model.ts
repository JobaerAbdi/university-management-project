import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";

export const  userSchema = new Schema<TUser>({
    id:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        // unique: true
    },
    needsPasswordChange: {
        type: Boolean,
        required: true,
    },
    role:{
        type: String,
        enum: ['student' , 'admin' , 'faculty'],
    },
    status: {
        type: String,
        enum: ['in-progress' , 'blocked'],
    },
    isDeleted: {
        type: Boolean,
        required:true,
    },
});

export const User = model<TUser>('User', userSchema);