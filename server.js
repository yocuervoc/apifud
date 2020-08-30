const http = require('http')
const express = require('express')
const asyncify = require('express-asyncify')

const api = require('./api')

const port = process.env.PORT || 3000
const app = asyncify(express())
const server = http.createServer(app)

app.use('/api', api)

//manejo de errores

// app.use((err, req, res, next) => {
//   if (err.message.match(/not found/)) {
//     return res.status(404).send({ error: err.message })
//   }
//   res.send({ error: err.message })
// })



server.listen(port, () => {
  console.log(`server listening on port ${port}`)
})