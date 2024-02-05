import User from "../model/User.js";
import bcrypt from "bcryptjs";
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import dotenv from "dotenv";

dotenv.config();

// @description Register users
// @route       Post /api/v1/users/register
// @access      Private/Admin

export const userRegistrationController = asyncHandler(async(req,res)=>{
    const {zone, username, email, isAdmin, description, password} = req.body;
    const convertedImages = req.file.path;
    //check if user exist
    const userExists = await User.findOne({email});
    if(userExists){
        throw new Error("User already exists");
    }
    else{
        //hash password
        const salt = await bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(password, salt);
        //create user
        const user = await User.create({
            username, 
            email,
            password: hashedPassword,
            description,
            isAdmin,
            zone,
            profileImage:convertedImages,
            hasProfileImage:true,
        })
        //response
        res.status(200).json({
            status:"success",
            msg:"User registered succesfully",
            data: user,
        })
    }
});

// @description Login user
// @route       Post /api/v1/users/login
// @access      Public
export const userLoginController = asyncHandler(async(req, res)=>{
    const {email,password} = req.body;
    
    //Find user in db by email only
    const userFound = await User.findOne({email});

    if(userFound && await bcrypt.compare(password, userFound?.password)){
        res.json({
            status:'success',
            msg:'Success login',
            userFound,
            token: generateToken(userFound.id)
        });
    }
    else{
        throw new Error('Invalid login credentials');
    }  
});

// @description get all users
// @route       GET /api/v1/users/allUsers
// @access      Private/Admin
export const getAllUserController = asyncHandler(async(req,res)=>{
    const users = await User.find();
    res.json({
        status:"success",
        msg: "Users:",
        users,
    })
})

// @description Update users
// @route       PUT /api/v1/users/:id/update
// @access      Private/Admin
export const updateUserController = asyncHandler(async(req,res)=>{
    const {zone, username, email, isAdmin, description} = req.body;
    const convertedImages = req.file.path;
    const findEmail = await User.findOne({email});
    if(findEmail){
        throw new Error("email already exist");
    }
    
    //print the final user
    const user = await User.findByIdAndUpdate(req.params.id, {
        profileImage : convertedImages,
        zone, 
        username,
        email,
        isAdmin,
        description,
    },
    {runValidators: true, returnOriginal: false, useFindAndModify: false},
    {new:true});

    res.json({
        status:"success",
        msg: "Users:",
        user,
    })
})

// @description get employee by zone 
// @route       GET /api/v1/zones
// @access      Public
export const getUserByZone = asyncHandler(async(req,res)=>{
    const zone1 = await User.find({
        hasProfileImage: true,
        zone: "zone1",
    })

    const zone2 = await User.find({
        hasProfileImage: true,
        zone: "zone2",
    })

    const zone3 = await User.find({
        hasProfileImage: true,
        zone: "zone3",
    })

    const zone4 = await User.find({
        hasProfileImage: true,
        zone: "zone4",
    })
    
    res.json({
        status:"success",
        msg: "zones:",
        zone1,
        zone2,
        zone3,
        zone4,
    })
})

// @description delete user
// @route       delete /api/v1/users/:id/delete
// @access      Private/Admin
export const deleteUserController = asyncHandler(async(req,res)=>{
    const users = await User.findByIdAndDelete(req.params.id);
    res.json({
        status:"success",
        msg: "User delete",
    })
})


