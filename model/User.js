import mongoose from "mongoose";

const Schema = mongoose.Schema;
//Schema is blueprint for model
const UserSchema = new Schema({
    username:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    zone:{
        type:String,
        required: true,
        enum:['zone1', 'zone2', 'zone3', 'zone4', 'nozone'],
    },
    description:{
        type:String,
        required: true,
    },
    profileImage:{
        type:String,
        required: true,
    },
    hasProfileImage:{
        type:Boolean,
        default:false,
    },
    employeeIdNo:{
        type:String,
        required: true,
    },
    phoneNumber:{
        type:String,
        required: true,
    },
    
}, {timestamps:true})

const User = mongoose.model("User", UserSchema);
export default User;