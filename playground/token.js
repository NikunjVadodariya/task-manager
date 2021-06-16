const jwt = require('jsonwebtoken')

const fun = () => {

    const token = jwt.sign({_id: "dummy id"}, 'This is my secret', {"expiresIn": "7 days"})
    console.log(token)

    const payload = jwt.verify(token, "This is my secret")
    console.log(payload)
}

fun()