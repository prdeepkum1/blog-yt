import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/Profile"
import YourBlog from "./pages/YourBlog"
import Comments from "./pages/Comments"
import CreateBlog from "./pages/CreateBlog"
import UpdateBlog from "./pages/Updateblog"
import BlogView from "./pages/BlogView"
import Footer from "./components/Footer"


// add
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navbar/><Home/><Footer/></>
  },
  {
    path: "/blogs",
    element: <><Navbar/> <Blogs/><Footer/></>
  },

  {
    path: "/about",
    element: <><Navbar/> <About/><Footer/></>
  },

  {
    path: "/login",
    element: <><Navbar/>  <Login/></>
  },

  {
    path: "/signup",
    element: <><Navbar/> <Signup/></>
  },

   {
    path: "/blogs/:id",
    element: <><Navbar/> <BlogView/></>
  },

  // DASHBOARD
   {
    path: "/dashboard",
    element: <> <Navbar/><Dashboard/></>,
    children:[
    {
      path:"profile",
      element:<Profile/>
    },
    {
      path:"your-blog",
      element:<YourBlog/>
    },
    {
      path:"comments",
      element:<Comments/>
    },
    {
      path:"write-blog",
      element:<CreateBlog/>
    },
    {
      path:"write-blog/:blogId",
      element:<UpdateBlog/>
    }
  ]
  },

])



const app = () => {
  return (
    <>
      <RouterProvider router={router}/>
       <ToastContainer /> {/* ✅ Add this */}
    </>
  )
};

export default app;