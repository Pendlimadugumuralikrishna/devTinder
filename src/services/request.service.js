import express from "express";
import ConnectionRequest from "../models/connectionModel.js";
import { findById } from "./user.service.js";
export const storeConnectionRequest = async (fromUserId, toUserId, status) => {
    console.log("from user id: " + fromUserId);
    console.log("to user id: " + toUserId);
    console.log("status: " + status);
    try {
        const connectionExists = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });

        console.log("connection exists: " + connectionExists);
        if (connectionExists) {
            console.log("Inside connection exists");
            throw new Error("Connection has already been sent");
        }

        let isReceiverPresent = await findById(toUserId);
        console.log(isReceiverPresent);
        if (!isReceiverPresent) {
            throw new Error("The receiver account does not exist");
        }

        let connect = await new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        await connect.save();

        console.log("connect: " + connect);
        return connect;
    } catch (e) {
        console.error(`Error in storeConnectionRequest: ${e.message}`);
        return { error: e.message }; // Return error instead of throwing
    }
};
