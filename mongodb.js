const mongodb= require("mongodb")

const {MongoClient, ObjectID} = mongodb

const connectionURL = "mongodb://127.0.0.1:27017"
const database_name = "task-manager"

MongoClient.connect(connectionURL, {
    'UseNewUrlParser': true,
}, (error, client) => {
    if(error){
        return console.log("Unable to connect to database")
    }
    console.log("Connected Successfully")

    const db = client.db(database_name)
    // db.collection('user').insertOne({
    //     name: "Nikunj",
    //     age: 23
    // }, (error, result) => {
    //     if(error){
    //         console.log("Unable to add")
    //     }
    //     else{
    //         console.log(result.ops)
    //     }
    // })

    // db.collection("user").insertMany([{name: "Niks"}, {"name": "kunj"}], (error, result) => {
    // })

    // db.collection("tasks").insertMany([
    //     {description: "Task one", completed: true},
    //     {description: "Task two", completed: false},
    //     {description: "Task three", completed: false}
    // ], (error, result) => {
    //     console.log(result)
    // })

    // db.collection('user').findOne({name: "Nikunj"}, (error, result) => {
    //     console.log("Fetched from DB",result)
    // })

    // db.collection('user').findOne({age: 23}, (error, result) => {
    //     console.log("Fetched from DB",result)
    // })
    // db.collection('user').find({age: 23}).toArray((error, result) => {
    //     console.log("Fetched from DB",result)
    // })
    // db.collection('user').find({age: 23}).count((error, result) => {
    //     console.log("Fetched from DB",result)
    // })

    // db.collection('tasks').findOne({_id: new ObjectID("60b4736c9066d247f7e85e43")}, (error, result) => {
    //     console.log("Fetched from DB",result)
    // })
    // db.collection('tasks').find({completed: false}).toArray((error, result) => {
    //     console.log("Fetched from DB",result)
    // })

    // const updatePromise = db.collection("user").updateOne({
    //     _id: new ObjectID("60b4670f5749552f28511f4b")
    // },{
    //     $set: {
    //         name: "Nikunj Vadodariya",
    //         occupation: "Engineer"
    //     },
    //     $inc: {
    //         age: 10
    //     }
    // })

    // updatePromise.then((data) => {
    //     console.log(data)
    // }).catch((error) => {
    //     console.log(error)
    // })


    const deletedoc = db.collection('user').deleteMany({
        age: 44
    })

    deletedoc.then((data) => {
        console.log(data)
    }).catch((error) => {
        console.log(error)
    })
})