require('dotenv').config()

const Twilio = require('twilio')
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')

const { getStationsInfos } = require('./velib')

const port = process.env.PORT
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

app.post('/message', async function(req, res) {
  const msg = await client.messages.create({
    body: 'What?',
    to: req.body.From,
    from: process.env.TWILIO_NUMBER,
  })
  res.writeHead(200, { 'Content-Type': 'text/xml' })
  res.end(msg.sid)
})

http.createServer(app).listen(port, function() {
  console.log(`server listening on port ${port}`)
})
