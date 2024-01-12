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
        default:'nozone',
        enum:['zone1', 'zone2', 'zone3', 'zone4', 'nozone'],
    },
    description:{
        type:String,
    },
    profileImage:{
        type:String,
    },
    hasProfileImage:{
        type:Boolean,
        default:false,
    }
    
}, {timestamps:true})

const User = mongoose.model("User", UserSchema);
export default User;