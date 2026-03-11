import React, { useEffect, useState } from 'react'
import { Avatar, AvatarImage } from './ui/avatar';
import { useSelector, useDispatch } from 'react-redux'
import { AvatarFallback } from '@radix-ui/react-avatar';
import { Textarea } from './ui/textarea';
import { LuSend } from "react-icons/lu";
import { Button } from './ui/button';
import axios from 'axios'
import { FaRegHeart } from 'react-icons/fa';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';


const CommentBox = ({ selectedBlog }) => {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const [content, setContent] = useState("")
    const { comment } = useSelector(store => store.comment)


    // const changeEventHandler = (e)=>{
    //     const inputText = e.target.value;
    //     if(inputText.trim()){
    //         setContent("inputText")
    //     }
    // }

    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        setContent(inputText)
    }

    const commentHandler = async () => {
        try {
            const res = await axios.post(`https://blog-yt-wau1.onrender.com//blog/${selectedBlog._id}/create`, { content }, {
                headers: {
                    "Content-Type": "application/json"
                }, withCredentials: true
            })
            if (res.data.success) {
                let updatedCommentData

                if (comment.length >= 1) {
                    updatedCommentData = [...comment, res.data.comment]
                } else {
                    updatedCommentData = [res.data.comment]
                }
                dispatch(comment(updatedCommentData))

                const updatedBlogData = BlogCard.map(blog =>
                    blog._id === selectedBlog._id ? { ...blog, comments: updatedCommentData } : blog
                );
                dispatch(setBlog(updatedBlogData))
                toast.success(res.data.message)
                setContent("")
            }
        } catch (error) {
            console.log(error);
            toast("Comment not added")
        }
    }

    useEffect(() => {
        const getAllcommentsOfBlog = async () => {
            try {
                const res = await axios.get(`https://blog-yt-wau1.onrender.com//blog/${selectedBlog._id}/comment/all`)
                const data = res.data.comments
                dispatch(setComment(data))
            } catch (error) {
                console.log(error);
            }
        }
        getAllcommentsOfBlog();
    }, [selectedBlog])
    return (
        <div>
            <div className="flex gap-4 mb-4 items-center">
                <Avatar>
                    <AvatarImage src={user.photoUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h3 className='font-semibold'>{user.firstName} {user.lastName}</h3>
            </div>

            <div className='flex gap-3'>
                <Textarea
                    placeholder="Leave a comment"
                    className="bg-gray-100 dark:bg-gray-800"
                    value={content}
                    onChange={changeEventHandler}
                />
                <Button onClick={commentHandler}><LuSend /></Button>
            </div>
            {
                comment.length > 0 ? <div className='mt-7 bg-gray-100 dark:bg-gray-800 p-5 rounded-md'>
                    {
                        comment.map((item, index) => {
                            return <div key={index} className='mb-4'>
                                <div className='flex items-center justify-between'>
                                    <div className='flex gap-3 item'>
                                        <Avatar>
                                            <AvatarImage src={item?.userId?.photoUrl} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div className='mb-2 space-y-1 md:w-[400px]'>
                                            <h1 className='font-semibold'>{item?.userId?.firstName} {item?.userId?.lastName} <span className='text-sm ml-2 font-light'>yesterday</span></h1>
                                            <p>{item?.content}</p>

                                            <div className='flex gap-5 items-center'>
                                                <div className='flex gap-2 items-center'>
                                                    <div className='flex gap-1 items-center cursor-pointer'>
                                                        <FaRegHeart />
                                                        <span>{item.numberOfLikes}</span>
                                                    </div>
                                                </div>
                                                <p className='text-sm cursor-pointer'>Reply</p>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        user._id === item?._id ? <DropdownMenu>
                                            <DropdownMenuTrigger><BsThreeDots /></DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem><Edit />Edit</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => deleteComment(item._id)} className="text-red-500"></DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu> : null
                                    }
                                </div>
                            </div>
                        })
                    }
                </div> : null
            }

        </div>
    )
}


export default CommentBox;