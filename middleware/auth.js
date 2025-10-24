const jwt = require('jsonwebtoken');

/**
 * auth(requiredRole) -> middleware
 * - requiredRole: 'admin' to restrict route to admin
 * - If no argument, route allows any authenticated user
 */
module.exports = (requiredRole = null) => {
  return (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.replace('Bearer ', '');
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (requiredRole && req.user.role !== requiredRole)
        return res.status(403).json({ message: 'Access denied: Admin only' });

      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
};
