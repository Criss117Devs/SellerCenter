import Users from "../models/users.js";
import { createToken } from "../utils/oAuth.js";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../config.js";

const signUp = async (req, res, next) => {
  const { id, firstName, lastName, password, email, status, role } = req.body;

    try {
      const hash = await bcrypt.hash(password, SALT_ROUNDS);
      const user = await Users.query({
        type: Users.types.CREATE,
        data: { id, firstName, lastName, password: hash, email, status, role },
      });
     
      if (user.error) {
        return res.status(400).json({ message: user.error });
      }
      res.status(201).json({ message: "Usuario creado" });
      next();
    } catch (err) {
      next(err)
    }
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

const updateUser = async(req, res, next) => {
  try {
    const { id } = req.params;
   // console.log(id);
    const { /*firstName, lastName, email, status, role*/...rest } = req.body;
    console.log(rest);
    const user = await Users.query({
      type: Users.types.UPDATE,
      data: { rest },
    });
   
    if (user.error) {
      return res.status(400).json({ message: user.error });
    }
    res.status(201).json({ message: "Usuario update" });
    next();

  } catch (error) {
    return res.status(400).json({ message: error });
  }
}

export {
  signUp,
  signIn,
  updateUser
};
