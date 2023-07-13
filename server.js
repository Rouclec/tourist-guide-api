const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config({ path: './config.env' })

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
console.log('account sid: ', accountSid);
console.log('auth token: ', authToken)




//create a middleware to call the express package
const app = express()
const port = process.env.PORT || 3000;


app.use(bodyParser.json())
app.use(bodyParser.raw())

app.post('/send_message/:type', (req, res) => {
    const client = require('twilio')(accountSid, authToken)
    const type = req.params.type
    // const { name, dateFrom, dateTo, locationFrom, locationTo } = req.body
    console.log('request body: ', req.body)
    console.log('request param: ', req.params.type)
    const name = req.body?.name, dateFrom = req.body?.dateFrom, dateTo = req.body?.dateTo, locationFrom = req.body?.locationFrom, locationTo = req.body?.locationTo

    if (type === 'Hotel') {
        console.log('checking in hotel>............................')
        client.messages
            .create({
                body: 'Your appointment is coming up on July 21 at 3PM',
                from: 'whatsapp:+14155238886',
                to: 'whatsapp:+237657297185'
            })
            .then(message => console.log(message.sid))
    } else {
        client.messages.create({
            body: `*${"\t\t"} ${type} Reservation ${"\t\t"}* ${"\n\n"}*By:* ${name}${"\n"}*From:* ${locationFrom}${"\n"}*To:* ${locationTo}`,
            from: "whatsapp:+14155238886",
            to: "whatsapp:+237657297185",
        }).then(message => console.log(message.sid))
            .done()
    }
})

app.listen(port, () => {
    console.log('App is running on port: ', port)
})