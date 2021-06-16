const jwt = require('jsonwebtoken')
const User = require("../models/user")

const auth = async (req, res, next) => {
    try{
        const token = req.headers['authorization'].replace("Bearer ", "")
        console.log("token", token)
        const decoded = await jwt.verify(token, 'This is secret')
        console.log("decoded", decoded)
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    }catch(e){
        console.log(e)
        res.status(401).send("Not authorozes")
    }
    console.log("In AUth")
}

module.exports = auth