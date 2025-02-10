import express from "express";
import { validateSignup,validateProfileData,validateSignin} from "../utils/Validate.js";
import { createUser, findUser, findAll, generateToken ,findById} from "../services/user.service.js";

export const signUp = async (req, res) => {
    const data = req.body;

    try {
        validateSignup(data);
       
        const user = await createUser(data);
       res.status(201).send(`User ${user.firstname} created successfullt`)

    } catch (e) {
        console.log(e);
        res.status("500").send(e.message);
    }
}


export const signIn = async (req,res) => {
    const data = req.body;
    try{
        validateSignin(data);
        const user = await findUser(data.email);
        if(!user){
            return res.status(400).json({
                message:"user does not exists"
            })
        }
        const isMatch = await user.comparePassword(data.password);
        if(!isMatch){
            return res.status(400).json({
                message:"invalid password"
            })
        }
        const token = await generateToken(user);
        res.cookie("token",token);
        res.status(200).send("User logged in successfullt");

    }catch(e){
        res.status(500).send(e.message);
    }



}

export const logout = async (req,res) =>{
    res.clearCookie('token');
    res.status(200).send("user logged out successfully");
}

export const getUser = async (req, res) => {
    const email = req.body.email;
    try {
        const user = await findUser(email);
        res.status(200).send(user);

    } catch (e) {
        res.status(500).send(e.message);
    }
}


export const getById = async (req,res) =>{
    const userId = req.userId;
    console.log(userId);
    try{
        const user = await findById(userId);
        res.status(200).send(user);

    }catch(e){
        res.status(500).send(e.message);
    }
}
export const getAllUsers = async (req, res) => {
    try {
        const users = await findAll();
        res.status(200).send(users);

    } catch (e) {
        res.status(500).send(e.message);
    }
}
export const editProfile = async (req,res) => {
    const data =  req.body;
    console.log(data);
    try{
        if(validateProfileData(req.body)){
            const user = await findById(req.userId);
            Object.keys(data).forEach(key=>{
                user[key] = data[key]
            })
            
            await user.save();
            res.status(200).json({
                message:"profile updated successfully",
                data:user
            });

        }else{
            throw new Error("Invalid data");
        }
    }catch(e){
        res.status(500).send(e.message);
    }
}

export const getRequestsData = async (req,res) => {
    try{
        const userId = req.userId;
        const connection = await ConnectionRequest.find({
            toUserId:userId,
            status:"interested"
        }).populate('fromUserId',['firstname', 'lastname'])

        res.status(200).json({
            message:"requests fetched successfullt",
            data:connection
        })

    }catch(e){
         res.status(500).send(e.message);
    }
}

export const getConnections = async (req,res) => {
    try{
        const userId = req.userId;
        const connection = await ConnectionRequest.find({
            $or:[
                {
                    fromUserId:userId,
                    status:"accepted"
                },
                {
                    toUserId:userId,
                    status:"accepted"
                }
            ]
        }).populate('fromUserId',['firstname', 'lastname'])

        const data = connection.map(conn => conn.fromUserId);

        res.status(200).json({
            message:"connections fetched successfullt",
            data:data
        })

    }catch(e){
         res.status(500).send(e.message);
    }
}