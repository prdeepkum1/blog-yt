import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { FaMoon, FaSun } from "react-icons/fa";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"


// add
import { setUser } from "../redux/authSlice";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userLogo from "../assets/user.jpg"





const Navbar = () => {
  // add
  const dispatch = useDispatch();

  const { user } = useSelector(store => store.auth) || {};
  const { theme } = useSelector(store => store.theme) || {};
  const navigate = useNavigate()
  // const {user} = useSelector(store => store.auth);
  // const dispatch = useDispatch()

  // add
  // const handleLogout = () => {
  //   dispatch(setUser(null));
  //   localStorage.removeItem("token");
  //   window.location.reload();
  // };

  // logout function
  const logoutHandle = async (e) => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/user/logout', { withCredentials: true })
      if (res.data.success) {
        navigate('/')
        dispatch(setUser(null))
        toast.error(error)
      }
    } catch (error) {
      console.log(error);
      // toast.error(error)
      toast.success("Logged out successfully");

    }
  }


  return (
    <div className=" py-2 fixed w-full dark-bg-gray-800 dark-border-b-gray-600 border-b-gray-300 border-2 bg-white z-50 ">
      <div className=" max-w-7xl mx-auto flex justify-between items-center px-4 md:px-0">
        {/* {logo section} */}
        <div className="flex gap-7 items-center">
          <Link to={'/'}>
            <div className="flex gap-7 items-center">
              <img src={Logo} ail="" className=" w-7 h-7 md:w-10 md:h-10 dark:invert" />
              <h1 className="font-bold text-3xl md:text-4xl">Logo</h1>
            </div>
          </Link>
          <div className="relative hidden md:block">
            <Input type="text" placeholder="search..."
              className="border border-gray-700 dark:bg-gray-900 bg-gray-300 w-[300px] hidden md:block"
            />
            <Button className="absolute right-0 top-0"><Search size={18} /></Button>
          </div>
        </div>
        {/* {nav section} */}
        <nav className='flex md:gap-7 gap-4 items-center'>
          <ul className="hidden md:flex gap-7 items-center text-xl font-semibold">
            <Link to={'/'}><li>Home</li></Link>
            <Link to={'/blogs'}><li>Blogs</li></Link>
            <Link to={'/about'}><li>About</li></Link>
          </ul>
          <div className="flex">
            <Button onClick={() => dispatch(toggleTheme())}>
              {
                theme === 'light' ? <FaMoon /> : <FaSun />
              }
            </Button>
            {
              user ? <div className="ml-7 flex gap-3 items-center">



                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar>
                      <AvatarImage src={user.photoUrl || userLogo} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="start">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() =>navigate('/dashboard/profile')}>
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() =>navigate('/dashboard/your-blog')}>
                        Your Blog
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() =>navigate('/dashboard/comments')}>
                        Comments
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() =>navigate('/dashboard/CreateBlog')}>
                        Write Blog
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        Log out
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      </DropdownMenuGroup>

                  </DropdownMenuContent>
                </DropdownMenu>


                <Button onClick={logoutHandle}>Logout</Button>
              </div> : <div className=" ml-7 md:flex gap-2">
                <Link to={"/login"}><Button>Login</Button></Link>
                <Link className="hidden md:block" to={"/signup"}><Button>Signup</Button></Link>
              </div>
            }
          </div>
        </nav>

      </div>
    </div>
  )
};

export default Navbar;