const jwt = require('jsonwebtoken');


const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Jetons JWT manquant' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Jetons JWT invalide' });
    }
    req.user = user;
    next();
  });
};
cv
module.exports = { authenticateToken };
