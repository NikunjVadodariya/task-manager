const demo = new Promise((resolve, reject) => {
    setTimeout(() => {

        console.log("Called")
        resolve([7, 4, 1])
        // reject("This is error")
    }, 2000)
})


demo.then((data) => {
    console.log("Success ", data)
}).catch((error) =>{
    console.log(error)
})


const add = (a,b) =>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a+b)
        }, 2000)
    })
}

// add(3, 5).then((sum) => {
//     console.log(sum)
//     add(sum, 6).then((sum2)=>{
//         console.log(sum2)
//     })
// }).catch((error)=> {
//     console.log(error);
// })

add(3, 5).then((sum) => {
    console.log(sum)
    return add(sum, 6)
}).then((sum2)=>{
    console.log(sum2)
}).catch((error)=> { 
    console.log(error);
})