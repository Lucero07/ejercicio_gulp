const express = require('express');
const app = express();

app.use('/',express.static('public'));

app.listen(9000,()=>{
	console.log("escuchando en el puerto 5000");
})
