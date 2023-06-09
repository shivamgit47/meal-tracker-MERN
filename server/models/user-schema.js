import mongoose from "mongoose";
import validator from 'validator';

const userSchema = new mongoose.Schema({
    username : {
        type:String,
        required:true,
        minlength:3
    },
    email : {
        type:String,
        required:true,
        unique:[true,"Email Id is already present"],
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new Error("Invalid Email")
            }
        }
    },
    password : {
        type:String,
        required:true
    }

})

const User = mongoose.model('User',userSchema);

export default User;