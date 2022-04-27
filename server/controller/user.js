import User from "../models/Users.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import {config} from '../config/config.js'


export const register = async (req,res) => {
    try {
      console.log('in register')
        const user = await User.findOne({ email: req.body.email });
        if (user) {
          return res.status(400).json({ email: "Email already exists" });
        } else {
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          });
        
          // Hash password before saving in database
         const salt = await bcrypt.genSalt(10);
          const hash = await  bcrypt.hash(newUser.password, salt)
              if (!hash) throw err;
              newUser.password = hash;
              const userRes = await newUser.save()
                return res.json(userRes)
          
        }    
    } catch (error) {
        res.status(500)
    }
    
}

export const login = async (req,res) => {
  try {
    const {email,password} = req.body
    // Find user by email
  const user = await User.findOne({ email })
      // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
   const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
      const token =  jwt.sign(
          payload,
         config.secretKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          }
        );
      return  res.json({
          success: true,
          token: "Bearer " + token
        });
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }  
  } catch (error) {
    console.log(error)
    return res.status(500)
  }
  
}

export const updateUser = async (req,res)=>{
  const updateUser = req.body;
  try {
    const newUser = {age: updateUser.age,dob:updateUser.dob,mobile:updateUser.mobile}
    const newUpdatedUser = await User.updateOne({_id:req.params.id},newUser)
    return res.status(200).json(newUpdatedUser);
  
  } catch (error) {
    console.log(error)
    return res.status(500)
  }
}

export const getUserDetails = async (req,res)=>{
  
  try {
    const newUser = await User.findById({_id:req.params.id})
    return res.status(200).json(newUser);
  
  } catch (error) {
    console.log(error)
    return res.status(500)
  }
}

export const getAllUser = async (req,res)=>{
  
  try {
    const users = await User.find({})
    return res.status(200).json(users);
  
  } catch (error) {
    console.log(error)
    return res.status(500)
  }
}
