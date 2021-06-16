const mail = require("@sendgrid/mail")

const key = "G.hBFd-OvTK-Zqxo4Eg.jkjkjk"
mail.sendApiKey(key)

mail.send({
    "to": "nikunj.vadodariya@marutitech.com",
    "from": "nikunj.vadodariya@marutitech.com",
    "subject": "This is subject",
    "text": "hello"
})