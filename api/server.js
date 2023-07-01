require('dotenv').config()

const express = require ('express')
const morgan = require ('morgan')
/* const helmet = require ('helmet') */
var cons = require("consolidate");
/* var __ = require("underscore");
__.string = require("underscore.string"); */

const app = express ()

app.use (morgan("tiny"))
/* app.use (helmet()) */
app.engine("html", cons.underscore);
app.set("view engine", "html");
app.set("views", "../front");

const routerClient = require ('./routes/routerClient')
app.use ('/public', routerClient)

const routerAPIv1 = require ('./routes/routerAPI-v1')
app.use ('/api/v1', routerAPIv1)

const routerAPIv2 = require ('./routes/routerAPI-v2')
app.use ('/api/v2', routerAPIv2)

const routerSeg = require ('./routes/routerSeg')
app.use ('/seg', routerSeg)

app.use (function (req, res) {
  res.status(404).send ('Recurso não encontrado.')
})

// Inicializa o servidor HTTP
const PORT = process.env.PORT || 3000
const SERVER = '0.0.0.0' 
app.listen (PORT, SERVER, function () {
  console.log (`Servidor rodando em http://localhost:${PORT}`)
})
