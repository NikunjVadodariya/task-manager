const express = require("express")
const User = require("../models/user")
const auth = require("../middleware/auth")
const multer = require("multer")
const sharp = require("sharp")

const router = new express.Router()

router.post("/users", async (req, res) => {

    const user = new User(req.body)
    try{
        await user.save()
        const token =  await user.generateauthtoken()
        res.status(201).send({user, user})
    }
    catch(e){
        console.log(e)
        res.status(400).send(e)
    }




    // user.save().then(() => {
    //     res.send(user)
    // }).catch((e) =>{
    //     res.status(400).send(e)
    //     // res.send(e)
    // })

    // console.log(req.body)
    // res.send("Hello")

})

router.post("/users/login", async (req, res) => {

    try{
        const user = await User.finByCredentials(req.body.email, req.body.password)
        const token =  await user.generateauthtoken()
        res.send({user, token})
    }
    catch(e){
        res.status(400).send(e)
    }

})

router.get("/users/logout", auth, async (req, res) => {

    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(400).send(e)
    }

})

router.get("/users/logoutall", auth, async (req, res) => {

    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(400).send(e)
    }

})


router.get("/users/me", auth, async (req, res) => {
    res.send(req.user)
    // try{
    //     const users = await User.find()
    //     res.send(users)
    // }
    // catch(e){
    //     res.status(500).send(e)
    // }


//  User.find().then((users) => {
//      res.send(users)
//  }).catch((e) => {
//     res.status(500).send(e)
//  })   

})

router.get("/users/:id", async (req, res) => {

    const _id = req.params.id
    try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(400).send()
        }
        res.send(user)
    }
    catch(e){
        res.status(500).send(e)
    }


    // const _id = req.params.id
    // User.findById(_id).then((user) => {
    //     if(!user){
    //         return res.status(400).send()
    //     }
    //     res.send(user)
    // }).catch((e) => {
    //    res.status(500).send(e)
    // })   
   })


router.patch('/users/me', auth, async (req, res) => {
    const allowed = ['name']
    const udates = Object.keys(req.body)
    const is_valid = udates.every((u) => {
        return allowed.includes(u)
    })
    if (!is_valid){
        return res.status(400).send()
    }
    const _id= req.params.id
    try{
        // const user = await User.findById(_id)
        udates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        // const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidator: true})
        // if(!req.user){
        //     return res.status(400).send()
        // }
        res.send(req.user)

    }catch(e){
        console.log(e)
        res.status(500).send(e)
    }

})

router.delete('/users/me', auth ,async (req, res) => {
    const _id= req.params.id
    try{
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(400).send()
        // }
        await req.user.remove()
        res.send()

    }catch(e){
        console.log(e)
        res.status(500).send(e)
    }

})

const upload = multer({
    // "dest": "avatars",
    limits: {
        fileSize:1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.endsWith('.png')){
        return cb(new Error("Upload png"))
        }
        else{
            cb(undefined, true)
        }
        // cb(new Error("Invalid"))
        // cb(undefined, true)
        // cb(undefined, false)
    }
})

const middle = (req, res, next) => {
    throw new Error()
}
router.post("/users/me/avatar", auth, upload.single("avatar"), async (req, res) => {

    const buffer = await sharp(req.file.buffer).resize({
        width: 250,
        height: 250
    }).png().toBuffer()

    // req.user.avatar = req.file.buffer
    req.user.avatar =  buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: "Error"})
})

router.delete("/users/me/avatar", auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: "Error"})
})

router.get("/users/:id/avatar", async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        console.log(user)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set("Content-Type", "image/png")
        res.send(user.avatar)
    }catch(e){
        console.log(e)
        res.status(400).send({error: "Error"})
    }
})

module.exports = router