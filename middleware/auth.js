const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader)
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(authHeader, process.env.JWT_SENHA, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.token = authHeader;
    req.user = {
      clienteId: decoded.clienteId
    };
    next();
  });
};

module.exports = auth;