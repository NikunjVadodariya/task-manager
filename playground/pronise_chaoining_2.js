require("../src/db/mongoose")
const Task = require("../src/models/task")

// ObjectId("60bf790b86f46d1c695abd2b")

// Task.findByIdAndDelete("60bf790b86f46d1c695abd2b").then((task)=>{
//     console.log(task)
//     return Task.countDocuments({completed: true})
// }).then((docs) => {
//     console.log(docs)
// }).catch((error) => {
//     console.log(error)
// })



const DeleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    return count
}

DeleteTaskAndCount("60bf790b86f46d1c695abd2b").then((data) => {
    console.log(data)
}).catch((error) => {
    console.log(error)
})