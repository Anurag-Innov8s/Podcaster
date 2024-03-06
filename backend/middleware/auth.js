const User = require('../models/User');
const jwt = require('jsonwebtoken');

const isAuthenticated = async(req,res)=>{
    try{
        let token = req.headers['cookie'];
        token = token?.split("=")[1]?.trim();

        if(!token){
            return res.status(401).json({
                message:"Please Login First",
            });
        }
        const decoded = await jwt.verify(token,process.env.JWT_SECRET);
        req.user= await User.findById(decoded._id);
        next();
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

export default isAuthenticated;
    