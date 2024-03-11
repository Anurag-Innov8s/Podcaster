const User = require('../models/User');
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt')


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_PASSWORD
    },
    port: process.env.SMPT_PORT,
    host: process.env.SMPT_HOST,
    authMethod:'PLAIN'
});  
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

exports.updatePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Please enter old and new Password carefully"
            })
        }
        const isMatch = await user.matchPassword(oldPassword);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Old Passworld didn't matched"
            })
        }
        user.password = newPassword;
        user.save();
        res.status(200).json({
            success: true,
            message: "Password Updated Successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.findUserByEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(200).json({
                success: true,
                user,
            })
        }
        else {
            return res.status(500).json({
                success: false,
                message: "User not found"
            })
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate
            ({
                path: "podcasts",
                populate: {
                    path: "creator",
                    select: "name img"
                }
            }).populate(
                {
                    path: "favourites",
                    populate: {
                        path: "creator",
                        select: "name img"
                    }
                }
            );
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.generateOTP = async (req, res,next) => {
    req.app.locals.OTP = await otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false, digits: true });
    const { email, name, reason } = req.query;
    const verifyOtp = {
        to: email,
        subject: 'Account Verification OTP',
        html: `
        <div style="font-family: Poppins, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
        <h1 style="font-size: 22px; font-weight: 500; color: #854CE6; text-align: center; margin-bottom: 30px;">Verify Your PODSTREAM Account</h1>
        <div style="background-color: #FFF; border: 1px solid #e5e5e5; border-radius: 5px; box-shadow: 0px 3px 6px rgba(0,0,0,0.05);">
            <div style="background-color: #854CE6; border-top-left-radius: 5px; border-top-right-radius: 5px; padding: 20px 0;">
                <h2 style="font-size: 28px; font-weight: 500; color: #FFF; text-align: center; margin-bottom: 10px;">Verification Code</h2>
                <h1 style="font-size: 32px; font-weight: 500; color: #FFF; text-align: center; margin-bottom: 20px;">${req.app.locals.OTP}</h1>
            </div>
            <div style="padding: 30px;">
                <p style="font-size: 14px; color: #666; margin-bottom: 20px;">Dear ${name},</p>
                <p style="font-size: 14px; color: #666; margin-bottom: 20px;">Thank you for creating a PODSTREAM account. To activate your account, please enter the following verification code:</p>
                <p style="font-size: 20px; font-weight: 500; color: #666; text-align: center; margin-bottom: 30px; color: #854CE6;">${req.app.locals.OTP}</p>
                <p style="font-size: 12px; color: #666; margin-bottom: 20px;">Please enter this code in the PODSTREAM app to activate your account.</p>
                <p style="font-size: 12px; color: #666; margin-bottom: 20px;">If you did not create a PODSTREAM account, please disregard this email.</p>
            </div>
        </div>
        <br>
        <p style="font-size: 16px; color: #666; margin-bottom: 20px; text-align: center;">Best regards,<br>The Podstream Team</p>
    </div>
        `
    }
    const resetPasswordOtp = {
        to: email,
        subject: "Podcaster Reset Password Verification",
        html: `
        <div style="font-family: Poppins, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
        <h1 style="font-size: 22px; font-weight: 500; color: #854CE6; text-align: center; margin-bottom: 30px;">Reset Your PODSTREAM Account Password</h1>
        <div style="background-color: #FFF; border: 1px solid #e5e5e5; border-radius: 5px; box-shadow: 0px 3px 6px rgba(0,0,0,0.05);">
            <div style="background-color: #854CE6; border-top-left-radius: 5px; border-top-right-radius: 5px; padding: 20px 0;">
                <h2 style="font-size: 28px; font-weight: 500; color: #FFF; text-align: center; margin-bottom: 10px;">Verification Code</h2>
                <h1 style="font-size: 32px; font-weight: 500; color: #FFF; text-align: center; margin-bottom: 20px;">${req.app.locals.OTP}</h1>
            </div>
            <div style="padding: 30px;">
                <p style="font-size: 14px; color: #666; margin-bottom: 20px;">Dear ${name},</p>
                <p style="font-size: 14px; color: #666; margin-bottom: 20px;">To reset your PODSTREAM account password, please enter the following verification code:</p>
                <p style="font-size: 20px; font-weight: 500; color: #666; text-align: center; margin-bottom: 30px; color: #854CE6;">${req.app.locals.OTP}</p>
                <p style="font-size: 12px; color: #666; margin-bottom: 20px;">Please enter this code in the PODSTREAM app to reset your password.</p>
                <p style="font-size: 12px; color: #666; margin-bottom: 20px;">If you did not request a password reset, please disregard this email.</p>
            </div>
        </div>
        <br>
        <p style="font-size: 16px; color: #666; margin-bottom: 20px; text-align: center;">Best regards,<br>The PODSTREAM Team</p>
    </div>
        `
    };
    if(reason === "FORGOTPASSWORD"){
        transporter.sendMail(resetPasswordOtp,(err)=>{
            if(err){
                next(err)
            }
            else{
                return res.status(200).json({
                    success:true,
                    message:"OTP Sent successfully"
                })
            }
        })
    }
    else{
        transporter.sendMail(verifyOtp,(err)=>{
            if(err){
                next(err)
            }else{
                return res.status(200).json({
                    success:true,
                    message:"OTP sent"
                })
            }
        })
    }
}

exports.verifyOtp = async(req,res)=>{
    const {code} = req.query;
    if(parseInt(code)===parseInt(req.app.locals.OTP)){
        req.app.locals.OTP = null;
        req.app.locals.resetSession = true;
        res.status(200).json({
            success:true,
            message:"OTP verified"
        })
        return next.status(500).json({
            success:false,
            message:"Invalid OPT"
        })
    }
}

exports.createResetSession = async(req,res)=>{
    try {
        if(req.app.locals.resetSession){
            req.app.locals.resetSession=false;
            return res.status(200).json({
                success:false,
                message:"Access Granted"
            })
        }
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Session Expired"
        })
    }
}

exports.resetPassword = async(req,res)=>{
    if(!req.app.locals.resetSession){
        return res.status(440).json({
            success:false,
            message:"Session Expired"
        })
    }
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if(user){
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password,salt);
            User.updateOne({email:email},{
                $set:{password:hashedPassword}
            }).then(()=>{
                req.app.locals.resetSession=false;
                return res.status(200).json({
                    success:true,
                    message:"Password reset successfully"
                })
            }).catch(err=>{
                next(err);
            })
        }
        else{
            return res.status(202).json({
                success:false,
                message:"User not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}