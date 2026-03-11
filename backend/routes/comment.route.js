import express from "express"
import {isAuthenticated } from "../middleware/isAuthenticated.js"
import {deleteComment, createComment, editComment, getCommentsOfPost, likeComment, getAllCommentOnMyBlogs} from "../controllers/comment.controllers.js"

const router = express.Router();

router.post("/:id/create",isAuthenticated, createComment)
router.delete("/:id/delete", isAuthenticated, deleteComment );
router.put("/:id/edit",isAuthenticated, editComment )
router.route("/:id/comment/all").get(getCommentsOfPost)
router.route("/:id/like").get(isAuthenticated, likeComment)
router.get("/my-blogs/comments", isAuthenticated, getAllCommentOnMyBlogs)


export default router;