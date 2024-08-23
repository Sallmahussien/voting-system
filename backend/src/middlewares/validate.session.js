import { verifyJwtToken } from "../utils/auth.js";

const validateSession = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authentication token missing' });
    }

    const decoded = verifyJwtToken(token);

    req.user = decoded;

    if (req.user.role !== 'USER' && req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default validateSession;
