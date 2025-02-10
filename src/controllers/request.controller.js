import express from "express";
import { storeConnectionRequest } from "../services/request.service.js";
import { findById } from "../services/user.service.js";
import User from "../models/userModel.js";
import ConnectionRequest from "../models/connectionModel.js";
export const makeRequest = async (req, res) => {
  try {
    const toUserId = req.params.toUserId;
    const fromUserId = req.userId;
    const status = req.params.status;
    let allowedStatus = ["interested","ignored"];
    if(!allowedStatus.includes(status)){
        return res.status(400).json({
            message:"invalid status"
        })
    }


    const connection = await storeConnectionRequest(fromUserId,toUserId,status);
 
    console.log("in conrler connec "+connection)
    res.status(200).json({
      message: "request sent seccessfully",
      data: connection,
    });
  }catch(e) {
    res.status(500).send(e.message);
  }
};


export const viewRequest = async (req,res) => {
  try{
    const {status,requestId} = req.params;
    const userId = req.userId;
    console.log(userId +"userid in the view")
    const user = await findById(userId);
    if(!user){
      return res.status(400).json({
        message:"user does not exists"
      })
    }

    let allowedStatus = ["accepted","rejected"];
    if(!allowedStatus.includes(status)){
      return res.status(400).json({
        message:"invalid status"
      })
    }


    const  connection =await  ConnectionRequest.findOne({
      _id:requestId,
      toUserId:userId,
      status:"interested"
    })
    
    if(!connection){
      return res.status(400).json({
        message:"connection request does not exists"
      })
    }

    connection.status = status;
    const data = await connection.save();
    res.status(200).json({
      message:"request reviewe successfullt",
      data
    })

  }catch(e){
    res.status(500).send(e.message);
  }
}
