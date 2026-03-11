import { Card } from "@/components/ui/card";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useDispatch, useSelector } from 'react-redux'
import { setBlog } from '@/redux/blogSlice'
import { BsThreeDotsVertical } from "react-icons/bs";
// import { store } from "./store";
import store from "../redux/store";
import axios from "axios";
import { useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, Trash2 } from "lucide-react";
import {useNavigate} from 'react-router-dom'
import { toast } from "react-hot-toast";



const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]



const YourBlog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const {blog} = useSelector(store = store.blog)
  const { blog } = useSelector((state) => state.blog);
  console.log(blog);

  const getOwnBlog = async () => {
    try {
      const res = await axios.get(`https://blog-yt-wau1.onrender.com//blog/get-own-blogs`, { withCredentials: true })
      dispatch(setBlog(res.data.blogs))
    } catch (error) {
      console.log(error);
    }
  }

  const deleteBlog = async (id) => {
    console.log("Delete clicked", id);
    try {
      const res = await axios.delete(`https://blog-yt-wau1.onrender.com//blog/delete/${id}`, {withCredentials:true})
      if(res.data.success){
        const updatedblogData = blog.filter((blogItem) => blogItem?._id !== id)
        dispatch(setBlog(updatedblogData))
        toast.success(res.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
  }

  useEffect(() => {
    getOwnBlog();
  }, []);

  const formatDate = (index) => {
    const date = new Date(blog[index].createdAt)
    const formattedDate = date.toLocaleDateString("en-GB")
    return formattedDate
  }

  return (
    <div className="pb-10 pt-20 md:ml-[320px] h-screen">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="w-full p-5 spax-y-2 dark:bg-gray-800">
          <Table>
            <TableCaption>A list of your recent blogs.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blog.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="flex gap-4 items-center">
                    <img src={item.thumbnail} className="w-20 rounded-md hidden md:block" alt="" />
                    <h1 onClick={()=> navigate(`/blogs/${item._id}`)} className="hover:underline cursor-pointer">{item.title}</h1>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{formatDate(index)}</TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><BsThreeDotsVertical />
                        {/* <Button variant="outline">Open</Button> */}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuGroup>
                          <DropdownMenuItem onClick={()=>navigate(`/dashboard/write-blog/${item._id}`)}><Edit/>Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500" onClick={()=>deleteBlog(item._id)}><Trash2 className="text-red-500"/>Delete</DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </Card>
      </div>
    </div>

  )
};

export default YourBlog;