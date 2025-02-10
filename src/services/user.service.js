import express from "express";
import User from "../models/userModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (data)=>{
   
    try{
        const user = new User(data);
        await user.save();
        return user;

    }catch(e){
        return e;
    }
}

export const findUser = async (email) =>{
    try{
        const user = await User.findOne({email:email});
        return user;

    }catch(e){
        return e;
    }
}

export const findById = async(id)=>{
    try{
        const user = await User.findById(id);
        console.log("findByid "+user)
        return user;
    }catch(e){
        return e;
    }
}

export const generateToken = async (data) =>{
    const {_id:userId} = data;
    try{
        let payload = {
            userId,
            exp:Math.floor(Date.now()/1000)+(60 *60 ),
    
            iat:Date.now(),
    
    
        }
        const token = jwt.sign(payload,"secrer");
        return token;

    }catch(e){
        return e;
    }

}

export const findAll = async () =>{
    try{
        const users =  await User.find({});
        return users;

    }catch(e){
        return e;

    }
}
