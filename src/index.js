require('dotenv').config()

const Twilio = require('twilio')
const http = require('http')
const express = require('express')

const { getStationsInfos } = require('./velib')

const port = process.env.PORT
const app = express()

const client = new Twilio(process.env.TWILIO_API_KEY, process.env.TWILIO_API_SECRET)

app.post('/message', async function(req, res) {
  const msg = await client.messages.create({
    body: 'What?',
    to: req.params.From,
    from: process.env.TWILIO_NUMBER,
  })
  res.writeHead(200, { 'Content-Type': 'text/xml' })
  res.end(msg.sid)
})

http.createServer(app).listen(port, function() {
  console.log(`server listening on port ${port}`)
})
