require('dotenv').config()
const http = require('http')

const { getStationsInfos } = require('./velib')

const server = http.createServer(handler)
const port = process.env.PORT

server.listen(port, err => {
  if (err) {
    console.log('x Problem with the server', err)
    process.exit(1)
  }
  console.log(`server listening on port ${port}`)
})

async function handler(req, res) {
  try {
    const body = await parseBody(req)
    console.log(body)
    res.writeHead(200)
    res.end('OK')
  } catch (err) {
    res.writeHead(400)
    console.log(err)
    res.end(err.message)
  }
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', chunk => (data += chunk))
    req.on('end', () => {
      try {
        console.log(data)
        const body = JSON.parse(data)
        resolve(body)
      } catch (err) {
        reject(err)
      }
    })
  })
}
