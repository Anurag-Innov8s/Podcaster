const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:false,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:false,
    },
    img:{
        type:String,
        default:"",
    },
    googleSignIn:{
        type:Boolean,
        required:true,
        default:false,
    },
    podcasts:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Podcasts",
        default:[],
    },favourites:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Podcasts",
        default:[],
    }
},
    {timestamps:true},
);

UserSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,12);
    }
    next();
})

UserSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

UserSchema.methods.generateToken = function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET);
}

module.exports = mongoose.model("User",UserSchema);