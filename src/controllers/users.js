import Users from "../models/users.js";
import { createToken } from "../utils/oAuth.js";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../config.js";

const signUp = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  // const hash =  bcrypt.hashSync(password, SALT_ROUNDS);
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  console.log(hash);
  const user = await Users.query({
    type: Users.types.CREATE,
    data: { firstName, lastName, email, password: hash },
  });

  if (user.error) {
    return res.status(400).json({ message: user.error });
  }
  res.status(201).json({ message: "Usuario creado" });
  next();
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.query({
    type: Users.types.SING_IN,
    data: { email },
  });

  if (user.error || !user.length) {
    return res
      .status(401)
      .json({ message: "Usuario o contraseña incorrectos" });
  }

  const isValid = await bcrypt.compare(password, user[0].password);

  if (!isValid) {
    return res
      .status(401)
      .json({ message: "Usuario o contraseña incorrectos" });
  }

  const token = createToken(user[0]);
  res.status(200).json({ token, ...user[0] });

  next();
};

export { signUp, signIn };
