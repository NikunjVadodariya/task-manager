const demo = (callback) => {
    setTimeout(() => {
        // callback("This is error", undefined)
        callback(undefined, "This is result")
    }, 2000)
}

demo((error, result) => {
    if(error){
        console.log(error)
    }
    else{
        console.log(result)
    }
})