import { verifyJwtToken } from "../utils/auth.js"

const authorizeUser = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decodedToken = verifyJwtToken(token);    
    if (decodedToken.role !== 'USER') {
      return res.status(403).json({ message: 'Access denied. Users Only.' });
    }

    req.user = decodedToken;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

export default authorizeUser;
