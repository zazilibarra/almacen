'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const Producto = require('./controllers/Producto');
const Usuario = require('./controllers/Usuario');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/productos', Producto.get);
app.get('/api/productos/:idClienteFiscal',Producto.getByIDClienteFiscal);
app.post('/api/productos',Producto.save);
app.delete('/api/productos/:idProducto',Producto._delete);
app.get('/api/usuarios',Usuario.get);
app.get('/api/usuarios/:idusuario',Usuario.getByIDUsuario);
app.post('/api/usuarios',Usuario.save);
app.delete('/api/usuarios/:idusuario',Usuario._delete);

module.exports = app;