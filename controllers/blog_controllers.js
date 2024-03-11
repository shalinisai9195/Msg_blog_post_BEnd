import mongoose from "mongoose";
import Blog from "../model/Blog.js";
import User from "../model/User.js";


export const getAllBlogs = async(req,res,next)=>{
  let blogs;
  try {
    blogs = await Blog.find().populate('user');
    
  } catch (error) {
    return res.status(400).json({message:"blog not found"})
  }
  if(!blogs){
    return res.status(404).json({message:"blog not found"})
  }
  return res.status(200).json({blogs})
}


export const addBlog = async(req,res,next)=>{
  
    const {title,description,image,user} = req.body;
    let exsitUser
    try {
      exsitUser = await User.findById(user)
    } catch (err) {
      return console.log(err)
    }
    if(!exsitUser){
      return res.status(400).json({message:"Unable to find user by this ID"})
    }
    let blog = new Blog({
      title,description,image,user
    })
    try {
      // to store the blog to user as well we create session
      const session =await mongoose.startSession();
      session.startTransaction();
     await blog.save({session});
     exsitUser.blogs.push(blog);
     await exsitUser.save({session});
     await session.commitTransaction();
    } catch (error) {
      return console.log('error',error)
    }
     return res.status(201).json({blog})
} 

export const updateBlog = async(req,res,next)=>{
   const blogId = req.params.id
   const{title,description} = req.body
   let updateBlog
   try {
    updateBlog = await Blog.findByIdAndUpdate(blogId,{ title, description })
    
   } catch (error) {
     return console.log('error occured')
   }
   if(!updateBlog){
    return res.status(500).json({message:"Not updated"})
   }
   return res.status(200).json({updateBlog})
}

export const getById = async(req,res,next)=>{
      
     let blogId = req.params.id
     let blog;
     try {
      blog = await Blog.findById(blogId)

     } catch (error) {
        return console.log('error',error);
     }
   if(!blog){
    return res.status(404).json({message:"Not found"})
   }
   return res.status(200).json({blog})

}

export const deleteBlog = async(req,res,next)=>{
   let id = req.params.id
   let blog;
   try {
    blog = await Blog.findByIdAndDelete(id).populate({ path: 'user', options: { strictPopulate: false } });
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    
   } catch (error) {
      return console.log(error)
   }
   if(!blog){
    return res.status(404).json({message:"not deleted"})
   }
  return res.status(200).json({message:"blog deleted!"})

}

export const getByUserId = async(req,res,next)=>{
    const userID = req.params.id;
    let userBlog;
    try {
      userBlog = await User.findById(userID).populate('blogs');
      
    } catch (err) {
      return console.log(err)
      
    }
    if(!userBlog){
      return res.status(404).json({message:"no blog found"})
    }

    return res.status(200).json({user:userBlog})
}
