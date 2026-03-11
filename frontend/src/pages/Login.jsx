import React from "react";
import auth from "../assets/auth.jpg";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { EyeOff, Loader2} from "lucide-react";
import { useState } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
// import { setUser } from "react-redux";
import { setUser, setLoading } from "../redux/authSlice"; // ✅ correct import path
import { useSelector } from "react-redux";

// add?
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Login = () => {
  const [showPassword, setshowPassword] = useState(false)
  const {loading} = useSelector(store=>store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [input, setInput] = useState({

    email: "",
    password: ""
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setInput((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(input);

    try {
      dispatch(setLoading(true))
      const res = await axios.post('http://localhost:8000/api/v1/user/login', input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      // if(res.data.success){
      //   navigate('/')
      //   dispatch(setuser(res.data.user))
      //   toast.success(res.data.message)
      // }
      if (res.data.success) {
        dispatch(setUser(res.data.user)); // ✅ correct action
        toast.success(res.data.message);
        navigate('/');
      }

    } catch (error) {
      // console.log(error);
      // toast.error(error.response.data.message)

      // add
      toast.error(error.response?.data?.message || "Login failed");
      //   console.log("Status:", error.response?.status);
      // console.log("Message:", error.response?.data);
      // toast.error(error.response?.data?.message )
    } finally{
      dispatch(setLoading(false))
    }


  };

  return (
    <div className="flex h-screen md:pt-14 md-h-[760px]">
      <div className="hidden md:block">
        <img src={auth} alt="" className="h-[700px]" />
      </div>
      <div className='flex justify-center items-center flex-1 px-4 md:px-0'>
        <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600 ">
          <CardHeader>
            <CardTitle>
              <h1 className="text-center text-kl front-semibold">Login into your account</h1>
            </CardTitle>
            <p className="mt-2 text-sm font-serif text-center dark:text-gray-300">Enter your details below to login your account</p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>

              <div >
                <Label>Email</Label>
                <Input type="email" placeholder="jonh.doe@ex.com" name="email"
                  className="dark:border-gray-600 dark:bg-gray-900 "
                  value={input.email}
                  onChange={handleChange}
                />
              </div>
              <div >
                <Label>Password</Label>
                <Input type={showPassword ? "text" : "password"}
                  placeholder="Enter your password" name="password"
                  className="dark:border-gray-600 dark:bg-gray-900 "
                  value={input.password}
                  onChange={handleChange}
                />
                <Button onClick={() => setshowPassword(!showPassword)} type="button" className="absolute right-3 top-6 text-gray-500">
                  <EyeOff size={20} />
                </Button>
              </div>
              <Button type="submit" className="w-full">
                {
                  loading ? (
                    <>
                    < Loader2 className='mr-2 w-4 h-4 animate-spin'/>
                    Please wait
                    </>
                  ) : ("Login")
                }
              </Button>
              <p className="text-center text-gray-600 dark:text-gray-300">Don't have an account? <Link to={'/signUp'}> <span className="underline 
              cursor-pointer hover:text-gray-800 dark:hover:text-gray-100">Sign Up</span></Link></p>
            </form>
          </CardContent>

        </Card>
      </div>
    </div>
  )
};

export default Login;