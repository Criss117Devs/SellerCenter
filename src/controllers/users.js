import Users from "../models/users.js";
import {
  createToken
} from "../utils/oAuth.js";
import bcrypt from "bcrypt";
import axios from "axios";
import qs from "qs";
import {
  SALT_ROUNDS
} from "../config.js";

const signUp = async (req, res, next) => {
  const {
    key_value_string,
    c_firstName,
    c_lastName,
    c_password,
    c_status
  } = req.body;
  try {
    // Buscar usuario en la base de datos de salesforce.
    var data = qs.stringify({
      'grant_type': 'client_credentials'
    });
    var config = {
      method: 'post',
      url: 'https://account.demandware.com/dw/oauth2/access_token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(c_firstName + ":" + c_password).toString('base64')
      },
      data: data
    };

    const userAdmin = await axios(config);
    if (userAdmin.data.access_token) {
      return res.json({
        err: 1,
        code: "",
        message: "Este usuario ya ha sido registrado en saleforce.",
        data: ""
      });
    }
  } catch (error) {
    // Posible error por no tener conexión con internet.
    if (error.code === "ENOTFOUND") {
      return res.json({
        err: 1,
        code: "",
        message: error.code,
        data: ""
      });
    }

    /*
    return res.status(error.response.status).json({
      err:1,
      code: error.response.status,
      message: error.code,
      data: error.response.data
    });*/
  }
  // Buscar usuario en la base de datos de MYSQL.
  // Mover amiddleware.
  console.log("Crear----------------------------");
  const findUser = await Users.query({
    type: Users.types.FINDBYCREDENTIALS,
    data: { key_value_string, c_firstName, }
  });
  if(findUser.length > 0)  {
    return res.json({
      err: 1,
      code: "",
      message: "El campo key_value_string o el campo c_firstName ya se encuentra registrado en MYSQL",
      data: ""
    });
  } else {

    const hash = await bcrypt.hash(c_password, SALT_ROUNDS);
    console.log(hash);
    const user = await Users.query({
      type: Users.types.CREATE,
      data: { key_value_string, c_firstName, c_lastName, c_password: hash, c_status }
    });
  
    if (user.error) {
      return res.status(400).json({ message: user.error });
    }
    res.status(201).json({ message: "Usuario creado" });
    next();
  }
  
  /*

  try {
    const hash = await bcrypt.hash(c_password, SALT_ROUNDS);
    const user = await Users.query({
      type: Users.types.CREATE,
      data: {
        key_value_string,
        c_firstName,
        c_lastName,
        c_password: hash,
        c_status
      },
    });
    
    console.log(key_value_string,
      c_firstName,
      c_lastName,
      hash,
      c_status);
    if (user.error) {
      return res.status(400).json({
        message: user.error
      });
    } else {
      console.log(user[0]);
      const token = createToken(user[0]);
      res.status(200).json({
        token,
        ...user[0]
      });
      res.status(201).json({
        message: "Usuario creado"
      });
      next();
    }
  } catch (err) {
    next(err)
  }*/
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
        message: "Usuario o contraseña  incorrectos."
      });
  }

  const isValid = await bcrypt.compare(c_password, user[0].c_password);

  if (!isValid) {
    return res
      .status(401)
      .json({
        message: "Usuario o contraseña  incorrectos."
      });
  }

  const token = createToken(user[0]);
  res.status(200).json({
    token,
    ...user[0]
  });
  next();
};

const updateUser = async (req, res, next) => {
  try {
    const {
      id
    } = req.params;
    const {
      c_firstName,
      c_lastName,
      c_password,
      c_status
    } = req.body;

    //rest.id = req.params.id;
    //console.log(rest);
    const user = await Users.query({
      type: Users.types.UPDATE,
      data: {
        c_firstName,
        c_lastName,
        c_password,
        c_status,
        id
      },
    });

    if (user.error) {
      return res.status(400).json({
        message: user.error
      });
    }
    res.status(201).json({
      message: "Usuario update"
    });
    //next();

  } catch (error) {
    return res.status(400).json({
      message: error
    });
  }
}

export {
  signUp,
  signIn,
  updateUser
};