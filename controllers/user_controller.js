import User from "../model/User.js";
import bcrypt from 'bcrypt';

export const getAllUser = async(req,res,next) =>{
   let users;

   try {
     users = await User.find();
    
   } catch (error) {
     console.log('error in getAll user',error)
   }
   if(!users){
    return res.status(404).json({message:"No user found"})
   }
   return res.status(200).json({users})

}
export const signUp = async(req,res,next)=>{
   let {name,email,password} = req.body
   let exsitUser;
   try {
    exsitUser = await User.findOne({email})
   } catch (error) {
      console.log(error)
   }
   if(exsitUser){
    return res.status(404).json("user already exsit")
   }
   let hashedPwd = bcrypt.hashSync(password,10)
   const user = new User({
    name,
    email,
    password:hashedPwd,
    blogs:[]
   })
   try {
      await user.save();
   } catch (error) {
    console.log(error)
   }
   return res.status(201).json({user})

}

export const login = async(req,res,next)=>{
   let {email,password} = req.body;
   let exsitUser;
   try {
    exsitUser = await User.findOne({email})
   } catch (error) {
      console.log(error)
   }
   if(!exsitUser){
    return res.status(400).json("couldn't find user")
   }

   let isPwdCompare = bcrypt.compareSync(password,exsitUser.password)
   if(!isPwdCompare){
    return res.status(402).json({message:"invalid pwd"})
   }
   return res.status(200).json({message:"pwd is valid login successfully!",user:exsitUser})

}

