const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, process.env.JWT_SENHA, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }

    req.user = {
      clienteId: decoded.clienteId
    };
    next();
  });
};

module.exports = authenticateToken;