require("../src/db/mongoose")
const User = require("../src/models/user")

// ObjectId("60b47f8575994a58ec5c12f9")


// User.findByIdAndUpdate("60b47f8575994a58ec5c12f9", {age: 1}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age: 1})
// }).then((docs) => {
//     console.log(docs)
// }).catch((error) => {
//     console.log(error)
// })

const UpdateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age: age})
    const count = await User.countDocuments({age: 1})
    return count
}

UpdateAgeAndCount("60bf779cad3dd5192ec566f5", 1).then((data) => {
    console.log(data)
}).catch((error) => {
    console.log(error)
})