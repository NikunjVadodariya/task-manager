const mail = require("@sendgrid/mail")

const key = "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"
mail.sendApiKey(key)

mail.send({
    "to": "nikunj.vadodariya@marutitech.com",
    "from": "nikunj.vadodariya@marutitech.com",
    "subject": "This is subject",
    "text": "hello"
})