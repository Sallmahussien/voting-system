import { verifyJwtToken } from "../utils/auth.js"

const authorizeAdmin = (req, res, next) => {
  console.log('im here')
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decodedToken = verifyJwtToken(token);    
    if (decodedToken.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

export default authorizeAdmin;
