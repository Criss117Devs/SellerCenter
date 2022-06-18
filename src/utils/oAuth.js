import { JWT_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

const createToken = (user) => {
  const payload = {
    id: user.id,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: "No token" });
  }

  if (token.startsWith("Bearer")) {
    token = token.slice(7, token.length);
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Token inválido" });
    }
    req.user = decoded;
    console.log(req.user);
    next();
  });
};

export { createToken, verifyToken };
