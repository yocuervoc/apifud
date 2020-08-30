const http = require('http')
const express = require('express')
const asyncify = require('express-asyncify')
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const api = require('./api')

const port = process.env.PORT || 3000
const app = asyncify(express())
const server = http.createServer(app)

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "superFuds Api",
      description: "api for a CRUD of warehouses superfuds",
      contact: {
        name: "Yonatan Cuervo"
      },
      servers: ["http://localhost:3000"]
    },
  },  
  apis: ["api.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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