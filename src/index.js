const express = require("express")
require('./db/mongoose')
const user_router = require("./routers/user")
const task_router = require("./routers/task")
const multer = require("multer")

const port = process.env.PORT


const app = express()

// app.use((req, res, next) => {
//     // console.log(req.method)
//     if(req.method == "GET"){
//         res.send("GET requets are desabled")
//     }else{
//         next()
//     }
// })
// app.use((req, res, next) => {
//     // console.log(req.method)
//     res.status(503).send("Under maintainnce")
// })

app.use(express.json()) // Automatically pass request body to object


// const router = new express.Router()
// router.get("/test", (req, res) => {
//     console.log("Test router")
// })   
// app.use(router)

// app.get("/test", (req, res) => {
//     console.log("Test router")
// })   


app.use(user_router)
app.use(task_router)

const upload = multer({
    "dest": "images"
})

app.get("/upload", upload.single("upload"), (req, res) => {
    res.send()
})

app.listen(port, () => {
    console.log("Running at port" + port)
})

// const Task = require("./models/task")
// const main = async () => {
//     const task = await Task.findById('60c349bcaff3cdfe4b4ed1c5')
//     await task.populate('owner').execPopulate()
//     console.log(task.owner)
// }
// main()

// const User = require("./models/user")
// const main = async () => {
//     const user = await User.findById('60c3473976d007fa56502781')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }
// main()