import express from "express";
import { getAllBlogs,addBlog ,updateBlog, getById, deleteBlog,getByUserId} from "../controllers/blog_controllers.js";

const router = express.Router();

router.get('/',getAllBlogs);
router.post('/add',addBlog);
router.put('/update/:id',updateBlog);
router.get('/:id',getById);
router.delete('/delete/:id',deleteBlog);
router.get('/user/:id', getByUserId);



export default router;