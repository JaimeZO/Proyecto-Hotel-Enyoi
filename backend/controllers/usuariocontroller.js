//controllers/usuarioController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuario = require('../models/usuario');

//registro de usuario
exports.register = async (req, res) => {
    const { nombre, correo, clave, telefono, direccion, tipo } = req.body;
    try {
        const hashedClave = await bcrypt.hash(clave, 10);
        const usuario = await usuario.create({
            nombre,
            correo,
            clave: hashedClave,
            telefono,
            direccion,
            tipo
        });
        res.status(201).json({message: 'usuario registrado correctamente'});
    } catch (error) {
        res.status(500).json({error: 'error al registrar usuario' + error });
    }
};

//login de usuario
exports.login = async (req, res) => {
    const { correo, clave } = req.body;
    try {
        const usuario = await usuario.findOne({ where: {correo }});
        if (!usuario || !(await bcrypt.compare(clave, usuario.clave))) {
            return res.status(401).json({ error: 'credenciales incorrectas'});
        }
        const token = jwt.sign({ id: usuario.id, tipo: usuario.tipo }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'login exitoso', token });        
    } catch (error) {
        res.status(500).json({ error: 'error al iniciar sesión'});
    }
};

//obtener datos del usuario
exports.getUsuario = async (req, res) => {
    try {
        const usuario = await usuario.findByPk(req.userId, { attributes: { exclude: ['clave'] } });
        if (!usuario) return res.status(404).json({ error: 'usuario no encontrado'});
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'error al obtener usuario' });
    }
};



