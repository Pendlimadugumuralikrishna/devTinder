import mongoose from "mongoose";
import User from "./userModel.js";
const connectionSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'


    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true

    },
    status:{
        required:true,
        type:String,
        enum:{
            values:['ignored','interested','accepted','rejected'],
            message:'{VALUE} is not supported'
        }
    },

},{
    timestamps:true
})

connectionSchema.index({fromUserId:1,toUserId:1});

connectionSchema.pre('save',async function(next){
    if(this.fromUserId.equals(this.toUserId)){
        throw new Error("cannot send the request to your self");
    }
    next();
})

connectionSchema.post('save',async function(next){
    const fromUser = await User.findById(this.toUserId);
    console.log('connection request was sent to '+fromUser.firstname);
})

const ConnectionRequest = mongoose.model('ConnectionRequest',connectionSchema);
export default ConnectionRequest;