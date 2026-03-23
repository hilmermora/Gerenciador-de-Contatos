const express = require('express');
const app = express();
app.use(express.json());

let contactos = [];

// RUTA: Crear contacto (POST)
app.post('/contactos', (req, res) => {
const { nombre, email } = req.body;

// VALIDACIÓN: Si no hay nombre o email, devolvemos error 400
if (!nombre || !email) {
return res.status(400).json({ error: "Faltan datos requeridos" });
}

const nuevoContacto = { id: contactos.length + 1, nombre, email };
contactos.push(nuevoContacto);

// RESPUESTA: 201 Created
res.status(201).json(nuevoContacto);
});

module.exports = app;
