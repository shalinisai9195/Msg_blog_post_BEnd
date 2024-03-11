import mongoose from "mongoose";

const schema = mongoose.Schema;

const blogSchema = new schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    require:true
  },
  image:{
    type:String,
    require:true
  },
  user:{
    type:mongoose.Types.ObjectId,
    require:true,
    ref:"user"
  }
})

const Blog = mongoose.model('blog',blogSchema);

export default Blog;