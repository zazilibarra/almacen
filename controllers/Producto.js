'use strict'
const Producto = require('../models/Producto');

function get(req, res) {
	
	Producto.find({statusReg:"ACTIVO"}, (error,producto) => {
		if(error)
			return res.status(500).send({message:"Error"});

		res.status(200).send(producto);
	});

}

function getByIDClienteFiscal(req, res) {
	let _idClienteFiscal = req.params.idClienteFiscal;

	console.log(_idClienteFiscal);

	Producto.find({idClienteFiscal:_idClienteFiscal, statusReg:"ACTIVO"}, (error,producto) => {
		if(error)
			return res.status(500).send({message:"Error"});

		res.status(200).send(producto);
	});

}
//async
function save(req,res) {
	let nProducto = new Producto.model();

	nProducto.idClienteFiscal = req.body.idClienteFiscal;
	nProducto.idProducto = req.body.idProducto; //await Producto.getNextID();
	nProducto.statusReg = "ACTIVO";
	nProducto.fechaAlta = new Date();

	nProducto.clave = req.body.clave;
	nProducto.descripcion = req.body.descripcion;
	nProducto.existencia = req.body.existencia;
	nProducto.peso = req.body.peso;
	nProducto.stockMaximo = req.body.stockMaximo;
	nProducto.stockMinimo = req.body.stockMinimo;

	nProducto.save((error, productoStored)=>{
		if(error)
			res.status(500).send({message:`Error al guardar${error}`});

		res.status(200).send({productoStored});
	});
}

function _delete(req,res) {
	let _idProducto = req.params.idProducto;

	console.log(`INSIDE DELETE ${_idProducto}`);

	Producto.model.findOne({idProducto:_idProducto, statusReg:"ACTIVO"}) 
	.then((producto)=>{
		console.log(producto);
		producto.statusReg = "BAJA";

		producto.save().then(()=>{
			res.status(200).send(producto);
		})
	}).catch((error)=>{
		res.status(500).send(error);
	});

}

module.exports = {
	get,
	getByIDClienteFiscal,
	save,
	_delete
}