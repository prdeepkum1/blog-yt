import express from "express"

import {isAuthenticated } from "../middleware/isAuthenticated.js"
import { singleUpload } from "../middleware/multer.js"
import {createBlog} from "../controllers/blog.controller.js"
import {updateBlog, getOwnBlogs, deleteBlog, likeBlog, dislikeBlog, getMyTotalBlogLikes, getPublishedBlog, togglePublishBlog } from "../controllers/blog.controller.js"


const router = express.Router();

router.route("/").post(isAuthenticated, createBlog);
router.route("/:blogId").put(isAuthenticated , singleUpload, updateBlog)
router.route('/get-own-blogs').get(isAuthenticated , getOwnBlogs)
router.route("/delete/:id").delete(isAuthenticated, deleteBlog)
router.route("/:id/like").get(isAuthenticated, likeBlog)
router.route("/:id/dislike").get(isAuthenticated, dislikeBlog)
router.route("/my-blogs/likes").get(isAuthenticated, getMyTotalBlogLikes) 
router.route("/get-published-blogs").get(getPublishedBlog)
router.route("/:blogId").patch(togglePublishBlog)


export default router;