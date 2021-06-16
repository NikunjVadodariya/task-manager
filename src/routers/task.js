const express = require("express")
const Task = require("../models/task")
const auth = require("../middleware/auth")
const router = new express.Router()

router.post("/tasks", auth, async (req, res) => {

    const task = new Task({
        ... req.body,
    owner: req.user._id})
    try{
        await task.save()
        res.status(201).send(task)
    }
    catch(e){
        res.status(400).send(e)
    }

    // const task = new Task(req.body)

    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((e) =>{
    //     res.status(400).send(e)
    //     // res.send(e)
    // })

    // console.log(req.body)
    // res.send("Hello")

})

router.get("/tasks", auth, async (req, res) => {
    try{
        // const tasks = await Task.find({owner: req.user._id})
        // await req.user.populate("tasks").execPopulate()
        let completed = false
        if(req.query.completed == "true"){
            completed = true
        }
        let parts= ["createdAt", -1]
        let sorts = {}
        if(req.query.sort_by){
            let parts = req.query.send_by.split(":")
            sort[parts[0]] = parts[1]
        }
        await req.user.populate({
            path:"tasks",
            match: {
                completed: completed
            },
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: sorts
            }
        }).execPopulate()
        // res.send(tasks)
        res.send(req.user.tasks)
    }
    catch(e){
        console.log(e)
        res.status(500).send(e)
    }

    // Task.find().then((tasks) => {
    //     res.send(tasks)
    // }).catch((e) => {
    //    res.status(500).send(e)
    // })   
   
   })
   
router.get("/tasks/:id", auth,  async (req, res) => {
    const _id = req.params.id
    try{
        // const task = await Task.findById(_id)
        const task = await Task.findOne({_id, owner: req.user._id})
        if(!task){
            return res.status(400).send()
        }
        res.send(task)
    }
    catch(e){
        res.status(500).send(e)
    }

    // const _id = req.params.id
    // Task.findById(_id).then((task) => {
    //     if(!task){
    //         return res.status(400).send()
    //     }
    //     res.send(task)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })   
    })



router.patch('/tasks/:id', auth, async (req, res) => {
    const allowed = ['description', "completed"]
    const udates = Object.keys(req.body)
    const is_valid = udates.every((u) => {
        return allowed.includes(u)
    })
    if (!is_valid){
        return res.status(400).send()
    }
    const _id= req.params.id
    try{
        const task = await Task.findOne({_id, owner: req.user._id})
        // const task = await Task.findByIdAndUpdate(_id, req.body, {new: true, runValidator: true})
        if(!task){
            return res.status(400).send()
        }
        udates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)

    }catch(e){
        res.status(500).send(e)
    }

})

router.delete('/tasks/:id', auth, async (req, res) => {
    const _id= req.params.id
    try{
        const task = await Task.findByOneAndDelete({_id, owner: req.user._id})
        if(!task){
            return res.status(400).send()
        }
        res.send(task)

    }catch(e){
        res.status(500).send(e)
    }

})


module.exports = router