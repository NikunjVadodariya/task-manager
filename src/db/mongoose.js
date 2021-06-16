const mongoose = require("mongoose")
// const validater = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/tasks-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

// const User = mongoose.model("User", {
//     name: {
//         type: String,
//         required: true
//     },
//     age : {
//         type: Number,
//         validate(value){
//             // if (value < 0){
//             //     throw new error("Age positive must")
//             // }
//         }
//     },
//     email : {
//         type: String,
//         validate(value){
//             if (!validater.isEmail(value)){
//                 throw new error("Invalid Email")
//             }
//         }
//     },
//     password : {
//         type: String,
//         // minimumLength: 10,
//         required: true,
//         validate(value){
//             if (value.toLowerCase().includes("password")){
//                 throw new error("Invalid Password")
//             }
//         }
//     }
// })

// const me = new User({
//     name: "nikunj",
//     age: 23,
//     email: "Hello@gmail.com" ,
//     password: 123
// })


// me.save().then((data) => {
//     console.log(data)
// }).catch((error) => {
//     console.log(error)
// })

// const Task = mongoose.model("Task", {
//     description: {
//         type: String,
//         required: true
//     },
//     completed: {
//         type: Boolean
//     }
// })

// const tsk = new Task({
//     description: "This is task",
//     completed: true
// })

// tsk.save()