const add = (a,b) =>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(a<0 || b<0){
                return reject("Only positive")
            }
            resolve(a+b)
        }, 2000)
    })
}


const doWork = async () => {
    // throw new Error("Wrong")
    // return "Nikunj"
    const sum1 = await add(3, 5)
    console.log(sum1)
    const sum2 = await add(sum1, 5)
    console.log(sum2)
    console.log("Hello")
    const sum3 = await add(sum2, -5)
    console.log(sum3)
    return sum3
}

console.log(1)
doWork().then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})
console.log(2)

