console.log('hello world')

const { response } = require("express")
const http = require("http")

const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end('Hello World')
  })

const PORT = 5000
app.listen(PORT)
console.log(`Server running on port ${PORT}`)