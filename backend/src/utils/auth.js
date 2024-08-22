import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = (password) => {
  return bcrypt.hash(password, Number(process.env.HASHING_SECRET));
}

export const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
}

export const createToken = (id, role) => {
  return jwt.sign({ id, role },
    process.env.TOKEN_SECRET,
    { expiresIn: '3d' }
  );
};

export const verifyJwtToken = (token) => {
  return jwt.verify(token, process.env.TOKEN_SECRET);
}