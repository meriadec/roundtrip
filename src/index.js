require('dotenv').config()

const twilio = require('twilio')
const http = require('http')
const express = require('express')

const { getStationsInfos } = require('./velib')

const port = process.env.PORT
const app = express()

app.post('/message', function(req, res) {
  const twiml = new twilio.TwimlResponse()
  twiml.message('What?')
  res.writeHead(200, { 'Content-Type': 'text/xml' })
  res.end(twiml.toString())
})

http.createServer(app).listen(port, function() {
  console.log(`server listening on port ${port}`)
})
