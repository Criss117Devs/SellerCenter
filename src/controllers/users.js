import Users from "../models/users.js";
import { createToken } from "../utils/oAuth.js";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../config.js";

const signUp = async (req, res, next) => {
  const { id, key_value_string, c_firstName, c_lastName, c_password, c_status } = req.body;

    try {
      const hash = await bcrypt.hash(c_password, SALT_ROUNDS);
      const user = await Users.query({
        type: Users.types.CREATE,
        data: { id, key_value_string, c_firstName, c_lastName, c_password: hash, c_status },
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
  const {
    c_firstName,
    c_password
} = req.body;
const user = await Users.query({
    type: Users.types.SING_IN,
    data: {
        c_firstName
    },
});

if (user.error || !user.length) {
    return res
        .status(401)
        .json({
            message: "Usuario o contraseña incorrectos"
        });
}

const isValid = await bcrypt.compare(c_password, user[0].c_password);

if (!isValid) {
    return res
        .status(401)
        .json({
            message: "Usuario o contraseña incorrectos"
        });
}

const token = createToken(user[0]);
res.status(200).json({
    token,
    ...user[0],
    "type": "Basico"
});

next();
};

const updateUser = async(req, res, next) => {
  try {
    const { id } = req.params;
    const { c_firstName, c_lastName, c_password, c_status  } = req.body;
   
    //rest.id = req.params.id;
    //console.log(rest);
    const user = await Users.query({
      type: Users.types.UPDATE,
      data: { c_firstName, c_lastName, c_password, c_status, id },
    });
   
    if (user.error) {
      return res.status(400).json({ message: user.error });
    }
    res.status(201).json({ message: "Usuario update" });
    //next();

  } catch (error) {
    return res.status(400).json({ message: error });
  }
}

export {
  signUp,
  signIn,
  updateUser
};
