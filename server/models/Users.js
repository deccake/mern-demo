import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  age:{
      type:String,
      required: false,
      default:''
  },
  dob:{
      type:String,
      required: false,
      default:''
  },
  mobile:{
      type:Number,
      required: false,
      default:0
  }
});

const User = mongoose.model("users", UserSchema); 
export default User;