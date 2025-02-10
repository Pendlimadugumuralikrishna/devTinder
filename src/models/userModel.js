import mongoose from "mongoose";
import validator from "validator";
const {Schema} = mongoose;
import bcrypt from "bcrypt";

const userSchema = new Schema({
    firstname:{
        type:"String",
        required:true
    },
    lastname:{
        type:"String",
        required:true
    },
    email:{
        type:"String",
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please Enter the valid Email");
            }
        }

    },
    password:{
        type:"String"
    }
})

userSchema.index({email:1});


userSchema.pre("save",async function(next){
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(this.password,salt);
    this.password = hashedPassword;
    next();
})

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password);
}

const User = mongoose.model("User",userSchema);

export default User;