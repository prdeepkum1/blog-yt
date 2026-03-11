import { AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Avatar } from '@radix-ui/react-avatar';
import React from 'react'
import userLogo from "../assets/user.jpg"
import { Link } from 'react-router-dom';
import { FaFacebook, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa'
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
// import { Field, FieldGroup } from "../components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea';
import {useSelector, useDispatch} from 'react-redux'
import { useState } from "react";
import { setLoading, setUser } from "../redux/authSlice";
import axios from "axios";
import { toast } from "react-toastify";





const Profile = () => {
  const [open, setOpen] = useState(false)
  // user update 
  const {user} = useSelector(store=>store.auth)
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    firstName: user?. firstName,
    lastName: user?. lastName,
    occupation: user?. occupation,
    bio: user?. bio,
    facebook: user?. facebook,
    linkedin: user?. linkedin,
    github: user?. github,
    instagram: user?. instagram,
    file: user?. photoUrl
  })

  const changeEventHandler = (e)=>{
    const {name, value} = e.target;
    setInput((prev)=> ({
      ...prev,
      [name] : value
    }))
  }

  const changeFileHandle = (e)=>{
    setInput({...input, file:e.target.files?.[0]})
  }

  const submitHandler = async (e)=>{
    e.preventDefault()
// FORM HANDLE
    const formData = new FormData();
    formData.append("firstName", input.firstName);
    formData.append("lastName", input.lastName);
    formData.append("bio", input.bio);
    formData.append("occupation", input.occupation);
    formData.append("facebook", input.facebook);
    formData.append("linkedin", input.linkedin);
    formData.append("github", input.github);
    formData.append("instagram", input.instagram);
    if(input?.file){
      formData.append("file", input?.file)
    }

    console.log(input);
    try {
      dispatch(setLoading(true))
      const res = await axios.put('https://blog-yt-wau1.onrender.com//user/profile/update', formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true
      })
      if(res.data.success){
        setOpen(false)
        toast.success(res.data.message)
        dispatch(setUser(res.data.user))
      }
    } catch (error) {
      console.log(error);
    } finally{
      dispatch(setLoading(false));
    }
  }


    return (
        <div className='pt-20 md:ml-[20px] md:h-screen'>
            <div className='max-w-6xl mx-auto mt-8'>
                <Card className="flex md:flex-row flex-col gap-10 p-6 md:p-10 dark:bg-gray-800 mx-4 md:mx-0">
                    {/* image section */}
                    <div className="flex flex-col items-center justify-center md:w-[400px]">
                        <Avatar className="w-40 h-40 border-2">
                            <AvatarImage src={user.photoUrl || userLogo} />
                        </Avatar>
                        <h1 className="text-center font-semibold text-xl text-gray-700 dark:text-gray-300 my-3"> {user.occupation || "Mern Stack Developer" }</h1>
                        <div className="flex gap-4 items-center">
                            <Link><FaFacebook className='w-6 h-6 text-gray-800 dark:text-gray-300' /></Link>
                            <Link><FaLinkedin className='w-6 h-6 text-gray-800 dark:text-gray-300' /></Link>
                            <Link><FaGithub className='w-6 h-6 text-gray-800 dark:text-gray-300' /></Link>
                            <Link><FaInstagram className='w-6 h-6 text-gray-800 dark:text-gray-300' /></Link>
                        </div>
                    </div>

                    {/* info section */}
                    <div>
                        <h1 className='font-bold text-center md:text-start text-4xl mb-7'>Welcome { user.firstName || "User" }</h1>
                        <p><span className='font-semibold'>Email :</span> { user.email}</p>
                        <div className='flex flex-col gap-2 items-start justify-start my-5'>
                            <Label>About Me</Label>
                            <p className='border dark:border-gray-600 p-6 rounded-lg'>{user.bio || "your bio are not availabel"}</p>
                        </div>
                        {/* <Button>Edit Profile</Button> */}
                        <Dialog open={open} onOpenChange={setOpen}>
  {/* <form> */}
    {/* <DialogTrigger asChild> */}
      <Button onClick={()=> setOpen(true)}>Edit Profile</Button>
    {/* </DialogTrigger> */}
    <DialogContent className="sm:max-w-sm">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you&apos;re
          done.
        </DialogDescription>
      </DialogHeader>
      {/* <FieldGroup> */}
        {/* <Field> */}
        <div className='flex gap-2'>
            <Label htmlFor="name-1" >First Name</Label>
          <Input id="name-1" name="firstName" placeholder="First Name" type="text" className="col-span-3 text-gray-500" 
          value={input.firstName} onChange={changeEventHandler}/>

          <Label htmlFor="name-1">Last Name</Label>
          <Input id="name-1" name="lastName" placeholder="Last Name" type="text" className="col-span-3 text-gray-500"
          value={input.lastName} onChange={changeEventHandler} />
        </div>

        <div className='flex gap-2'>
            <Label htmlFor="name-1" >Facebook</Label>
          <Input id="Facebook" name="Facebook" placeholder="Enter a URL" type="text" className="col-span-3 text-gray-500"
          value={input.facebook} onChange={changeEventHandler} />

          <Label htmlFor="name-1">Instagram</Label>
          <Input id="Instagram" name="Instagram" placeholder="Enter a URL" type="text" className="col-span-3 text-gray-500"
          value={input.instagram} onChange={changeEventHandler} />
        </div>

        <div className='flex gap-2'>
            <Label htmlFor="name-1" >Linkedin</Label>
          <Input id="Linkedin" name="Linkedin" placeholder="Enter a URL" type="text" className="col-span-3 text-gray-500"
          value={input.linkedin} onChange={changeEventHandler} />

          <Label htmlFor="name-1">Github</Label>
          <Input id="Github" name="Github" placeholder="Enter a URL" type="text" className="col-span-3 text-gray-500"
          value={input.github} onChange={changeEventHandler} />
        </div>

          <div>
            <label className="taxt-right mt-1">Description</label>
            <Textarea className="col-span-3 text-gray-500"
            id="bio" name="bio"
            placeholder="Enter a description" 
            value={input.bio} onChange={changeEventHandler}
            />
          </div>

          <div>
            <label className="taxt-right mt-1">Picture</label>
            <Input 
            id="file" type="file" accept="image/*"
            className="w-[277px]"
            onChange={changeFileHandle}
            />
          </div>


      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button onClick={submitHandler} type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  {/* </form> */}
</Dialog>
        

                    </div>

                </Card>
            </div>

        </div>
    )
}

export default Profile;