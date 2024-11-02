import {  Request, Response,NextFunction } from "express"
import User from "../models/User.js";
import pkg from "bcryptjs"; // Import bcryptjs as a package
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
import { log } from "console";
// import { compare } from "bcrypt";
const { hash,compare } = pkg; 
export const getUsers=async(req:Request,res:Response,next:NextFunction)=>{
    try {
       const users=await User.find();
       
    res.status(200).json({mesage:"OK",users,});
    } catch (error) {
        res.json({mesage:"All users",cause:error,});

    }
}

export const UserSignUp=async(req:Request,res:Response,next:NextFunction)=>{
    try {
       const {name,email,password}=req.body;
       const existingUser=await User.findOne({email});
       if(existingUser){
        return res.status(401).send("User already existed");
       }
       const hashedPass=await hash(password,10);
       const user=new User({name,email,password:hashedPass});
       await user.save();

    res.status(201).json({mesage:"OK",id:user._id,});
    } catch (error) {
        res.json({mesage:"All users",cause:error,});

    }
}
export const UserLogin=async(req:Request,res:Response,next:NextFunction)=>{
    try {
       const {email,password}=req.body;
       const user=await User.findOne({email});
       if(!user){
        return res.status(401).send("User doesn't  exist");
       }
       const isPasswordCorrect=await compare(password,user.password);
       if(!isPasswordCorrect){
        return res.status(401).send("Password doesn't match");

       }

       //clear cookie and create token and set it in cookie
       res.clearCookie(COOKIE_NAME,{
        domain:"localhost",
        path:"/",
        httpOnly:true,
        signed:true,
       });

       const token=createToken(user._id.toString(),user.email,"7d");

        const expires=new Date();
        expires.setDate(expires.getDate()+7);
       res.cookie(COOKIE_NAME,token,{
        domain:"localhost",
        path:"/",
        expires,
        httpOnly:true,
        signed:true,
       })




        res.status(201).json({mesage:"OK",email:user.email,name:user.name,});
    } catch (error) {
        console.log(error.toString());
        res.json({mesage:"All users",cause:error.toString(),});

    }
}


export const verifyUser=async(req:Request,res:Response,next:NextFunction)=>{
    try {
       const user=await User.findById(res.locals.jwtData.id);
       if(!user){
        return res.status(401).send("User not registered OR token malfunctioned");
       }
       if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Permissions didn't match");
      }
        res.status(200).json({mesage:"OK",email:user.email,name:user.name,});
    } catch (error) {
        console.log(error.toString());
        res.json({mesage:"Error",cause:error.message});
    }
};

