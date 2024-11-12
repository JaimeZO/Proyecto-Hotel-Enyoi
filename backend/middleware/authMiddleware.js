//middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
const token = req.header('Authorization')?.replace('Bearer ','');

    if (!token) return res.status(401).json({ error: 'acceso denegado'});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        req.tipo = decoded.tipo;
        next();
    } catch (error) {
        res.status(400).json({ error: 'token inválido'});
    }

};

