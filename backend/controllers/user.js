const User = require('../models/User');


exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    if (!email) {
        return res.status(422).send({ message: "Please Provide an Email" })
    }
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.
                status(400)
                .json({ success: false, message: "User Already Exists" })
        }
        user = await User.create({
            name,
            email,
            password,
        })

        const token = await user.generateToken();
        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }
        res.status(201).cookie("token", token, options).json({
            success: true,
            user,
            token,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ success: false, message: "Please Enter Email and Password correctly" })
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User doesn't exists"
            })
        }
        if (user.googleSignIn) {
            return next(createError(201, "Entered email is Signed Up with google account. Please SignIn with google."));
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Password"
            })
        }
        const token = await user.generateToken();
        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        res.status(200).cookie("token", token, options).json({
            success: true,
            user,
            token,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.logout = async (req, res) => {
    try {
        res.status(200).cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
            .json({
                success: true,
                message: "Logged Out Successfully"
            })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.update = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const { name } = req.body;
        if (name) {
            user.name = name;
        }
        await user.save();
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.updatePassword = async(req,res)=>{
    try {
        const user = await User.findById(req.user._id);
        const {oldPassword, newPassword} =req.body;
        if(!oldPassword || !newPassword){
            return res.status(400).json({
                success:false,
                message:"Please enter old and new Password carefully"
            })
        }
        const isMatch = await user.matchPassword(oldPassword);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Old Passworld didn't matched"
            })
        }
        user.password=newPassword;
        user.save();
        res.status(200).json({
            success:true,
            message:"Password Updated Successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.findUserByEmail = async(req,res)=>{
    const {email} = req.body;
    try{
        const user = await User.findOne({email:email});
        if(user){
            return res.status(200).json({
                success:true,
                user,
            })
        }
        else{
            return res.status(500).json({
                success:false,
                message:"User not found"
            })
        }
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
