const mongoose = require("mongoose")
const validater = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') 
const sharp = require("sharp")
const Task = require("./task")

const userSchema = mongoose.Schema(
    {
    name: {
        type: String,
        required: true
    },
    age : {
        type: Number,
        validate(value){
            // if (value < 0){
            //     throw new error("Age positive must")
            // }
        }
    },
    email : {
        type: String,
        unique: true,
        validate(value){
            if (!validater.isEmail(value)){
                throw new error("Invalid Email")
            }
        }
    },
    password : {
        type: String,
        // minimumLength: 10,
        required: true,
        validate(value){
            if (value.toLowerCase().includes("password")){
                throw new error("Invalid Password")
            }
        }
    },
    avatar:{
        type: Buffer
    },
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }
    ]
},{
    "timestamps": true
})

userSchema.virtual("tasks", {
    "ref": "Task",
    "localField": "_id",
    "foreignField": "owner"
})

userSchema.methods.generateauthtoken = async function () {
    const user = this 
    const token = jwt.sign({_id: user._id.toString()}, "This is secret")

    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.finByCredentials = async (email, password) => {
    const user = await User.findOne({email: email})
    if(!user){
        throw new Error("Unable to login")
    }
    const is_matched = await bcrypt.compare(password, user.password)
    console.log(is_matched)
    if(!is_matched){
        throw new Error("Unable to login")
    }
    return user

}

//Plain text to hash password
userSchema.pre("save", async function (next){
    const user = this
    console.log("Before saving")
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.pre("remove", async function (next){
    const user = this
    console.log("Before removing")
    Task.deleteMany({ownor: requestAnimationFrame.user._id})
    next()
})


const User = mongoose.model("User", userSchema)


module.exports = User