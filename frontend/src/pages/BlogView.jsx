import React from 'react'
import { Link, useParams } from "react-router-dom"
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import Link from "next/link"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
// import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Bookmark, MessagesSquare, Share2 } from 'lucide-react';
import axios from "axios";
import { toast } from "react-hot-toast";
import { setBlog } from "@/redux/blogSlice";
import CommentBox from "../components/CommentBox"
// import { useParams } from "react-router-dom";





const BlogView = () => {

    // const params = useParams()
    // const blogId = params.blogId
    const { id } = useParams()

    const dispatch = useDispatch()
    const { blog } = useSelector(store => store.blog)
    const { user } = useSelector(store => store.auth)

    const selectedBlog = blog?.find(blog => blog._id === id)

    console.log("Blog array:", blog)
    console.log("Blog ID:", id)
    console.log("Selected Blog:", selectedBlog)

    if (!selectedBlog) {
        return <div>Loading...</div>
    }

    const [blogLike, setBlogLike] = useState(selectedBlog.likes.length)
    const [liked, setLiked] = useState(selectedBlog.likes.includes(user?._id) || false)
    // const selectedBlog = blog.find(blog => blog._id === blogId)
    // const [blogLike, setBlogLike] = useState(selectedBlog.likes.length)
    // const [liked, setLiked] = useState(selectedBlog.likes.includes(user._id) || false)
    console.log(selectedBlog);

    const changeTimeFormat = (isDate) => {
        const date = new Date(isDate);
        const options = { day: 'numeric', month: 'long', year: 'numeric' }
        const formattedDate = date.toLocaleDateString('en-Gb', options)
        return formattedDate
    }

    const handleShare = (id) => {
        const blogUrl = `${window.location.origin}/blogs/${id}`

        if (navigator.share) {
            navigator.share({
                title: 'Check out this blog',
                text: 'Read this amazing blog post',
                url: blogUrl,
            }).then(() => console.log('shared successfully')
            ).catch((err) => console.error('Error Sharing:', err))
        } else {
            // fall back copy to clipboard
            navigator.clipboard.writeText(blogUrl).then(() => {
                toast.success('Blog Link copied to clipboard')
            })
        }
    }

    // 
    const likeOrDislikeHandler = async () => {
        try {
            const action = liked ? 'dislike' : 'like'
            const res = await axios.get(`http://localhost:8000/api/v1/blog/${selectedBlog._id}/${action}`,
                { withCredentials: true })
            if (res.data.success) {
                const updatedLikes = liked ? blogLike - 1 : blogLike + 1;
                setBlogLike(updatedLikes)
                setLiked(!liked)
            }

            const updatedBlogData = blog.map(p => p._id === selectedBlog._id ? {
                ...p,
                likes: liked ? p.likes.filter(id => id !== user._id) : [...p.likes, user._id]
            } : p)
            toast.success(res.data.message)
            dispatch(setBlog(updatedBlogData))
        } catch (error) {
            console.log(error);
            // toast.error(error.response.data.message)
            toast.error(error?.response?.data?.message || "Something went wrong")
        }
    }

    return (
        <div className="pt-14 bg-blue-200 min-w-screen">
            <div className="max-w-6xl mx-auto p-10  ">
                <Breadcrumb>
                    <BreadcrumbList>

                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />

                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/docs/Components">Blogs</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{selectedBlog.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* blog header */}
                <div className="my-8">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">{selectedBlog.title}</h1>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className='flex items-center space-x-4'>
                            <Avatar>
                                <AvatarImage src={selectedBlog?.author?.photoUrl} alt="author" />
                                <AvatarFallback>PS</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium"><span>{selectedBlog.author?.firstName} {selectedBlog.author?.lastName}</span></p>
                                {/* <p className='text-sm text-muted-foreground'>{selectedBlog.author.occupation}</p> */}
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">published on {changeTimeFormat(selectedBlog.createdAt)}* 8 min read</p>
                    </div>
                </div>
                {/* featured image */}
                <div className='mb-8 rounded-lg overflow-hidden'>
                    <img src={selectedBlog.thumbnail} ail="thumbnail" width={1000} height={500} className='w-full object-cover' />
                    <p className='text-sm text-muted-foreground mt-2 italic'>{selectedBlog.subtitle}</p>
                </div>
                <p dangerouslySetInnerHTML={{ __html: selectedBlog.description }} />
                <div className="mt-10">
                    <div className='flex flex-wrap gap-2 mb-8'>
                        <Badge variant="secondary" className="dark:bg-gray-800">Next.js</Badge>
                        <Badge variant="secondary" className="dark:bg-gray-800">React</Badge>
                        <Badge variant="secondary" className="dark:bg-gray-800">Web Development</Badge>
                        <Badge variant="secondary" className="dark:bg-gray-800">Javascript</Badge>
                    </div>
                    {/* engagement */}
                    <div className="flex items-center justify-between border-y dark:border-gray-800 border-gray-300 py-4 mb-8">
                        <div className="flex items-center space-x-4">
                            <Button onClick={likeOrDislikeHandler} variant="ghost" className="flex itemscenter gap-1">
                                {
                                    liked ? <FaHeart size={24} className="cursor-pointer text-red-600" /> :
                                        <FaRegHeart
                                            size={24} className='cursor-pointer hover:text-gray-600 text-white'
                                        />
                                }
                                <span>{blogLike}</span></Button>
                            <Button variant="ghost" size="sm">
                                <MessagesSquare className="h-4 w-4" />
                                <span>1 Comments</span>
                            </Button>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <Button variant="ghost" size="sm">
                                <Bookmark className='w-4 h-4' />
                            </Button>
                            <Button onClick={() => handleShare(selectedBlog._id)} variant="ghost" size="sm">
                                <Share2 className='w-4 h-4' />
                            </Button>
                        </div>
                    </div>
                </div>
                <CommentBox selectedBlog={selectedBlog} />
            </div>
        </div>
    )
}

export default BlogView;



