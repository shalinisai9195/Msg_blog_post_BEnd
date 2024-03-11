import mongoose from "mongoose";

const schema = mongoose.Schema;

const UserSchema = new schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    minlength: 6
  },
  blogs:[{
    type:mongoose.Types.ObjectId,
    require:true,
    ref:"blog"
  }]
})

const User = mongoose.model('user', UserSchema)

export default User;

