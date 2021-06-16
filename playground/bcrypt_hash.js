
const b = require("bcrypt")

const f = async () => {
const p = "123"
const hp =  await b.hash(p, 8)

const matched  = b.compare(hp, "123")

console.log(p, hp)
}
f()