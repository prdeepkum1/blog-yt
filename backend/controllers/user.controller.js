import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

// register page
export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(500).json({
                success: false,
                message: "All field are required"
            })
        }

        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            })
        }
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be atleast 6 chareacter"
            })
        }
        const existingUserByEmail = await User.findOne({ email: email });
        if (existingUserByEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);
        await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword
        })

        return res.status(201).json({
            success: true,
            message: "Account create successfully"
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to registre"
        })
    }

};

// login page
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect user or password",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Incorrect user or password",
            });
        }


        const token = jwt.sign(
            { userId: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        );

        // Cookie set kar rahe hain (optional)
        res.cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            httpOnly: true,
            sameSite: "strict",
        });

        // Ek hi JSON response bhejo
        return res.status(200).json({
            success: true,
            message: `Welcome back ${user.firstName}`,
            token,
            user,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Faled to login"
        })
    }


};

// logout page
export const logout = async (_, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logout successfully",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
};

// update profile controller
export const updateProfile = async (req, res) => {
    try {
        const userId = req.id
        const { firstName, lastName, occupation, bio, instagram, facebook, linkedin, github } = req.body;
        const file = req.file;



         const user = await User.findById(userId).select("-password")
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }
    //    chat gpt
        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri);
            user.photoUrl = cloudResponse.secure_url;
        }

        // const fileUri = getDataUri(file)
        // let cloudResponse = await cloudinary.uploader.upload(fileUri)
        // console.log(cloudResponse);

        // let cloudResponse = await User.findById(userId).select("password")
        // const user = await User.findById(userId).select("-password")
        // if (!user) {
        //     return res.status(404).json({
        //         message: "User not found",
        //         success: false
        //     })
        // }

        // updating data
        if (firstName) user.firstName = firstName
        if (lastName) user.lastName = lastName
        if (occupation) user.occupation = occupation
        if (instagram) user.instagram = instagram
        if (facebook) user.facebook = facebook
        if (linkedin) user.linkedin = linkedin
        if (github) user.github = github
        if (bio) user.bio = bio
        // if (file) user.photoUrl = cloudResponse.secure_url

        await user.save()
        return res.status(200).json({
            message: "Profile updated successfully",
            success: true,
            user
        })
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update profile"
        })
    }

}

export const getAllUsers = async (req, res) =>{
    try {
        const users = await User.find().select("-password");
        res.status(200).json({
            success:true,
            message:"User list fetched successfully",
            total:users.length,
            users
        })
    } catch (error){
        console.error("Error fetching user list:", error)
        res.status(500).json({
            success:false,
            message:"Failed to fetch users"
        })
    }
}



// package.json file ka hai

// "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1",
//     "start": "node server.js"
//   },