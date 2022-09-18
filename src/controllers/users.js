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

import { getToken } from "../helpers/dbValidations.js"



const getUSerFromSalesforce = async (token, email) => {
  try {
    var data = JSON.stringify({
      "allocation": {
        "amount": 300
      }
    });

    var config = {
      method: 'get',
      url: 'https://bjqc-002.sandbox.us01.dx.commercecloud.salesforce.com/s/Sites-Site/dw/data/v20_9/custom_objects/SellerCenterAdmins/' + email,
      headers: {
        'x-dw-client-id': '{{clientid}}',
        'Authorization': 'Bearer ' + token,
        'Origin': '{{origin_url}}',
        'Content-Type': 'application/json'
      },
      data: data
    };

    const user = await axios(config);
    return user;
  } catch (error) {
    return error;
  }
}

const signUp = async (req, res, next) => {
  const {
    key_value_string,
    c_firstName,
    c_lastName,
    c_password,
    c_status
  } = req.body;

  const token = await getToken();
  if (token === "ENOTFOUND") {
    /*
      ENOTFOUND: Possible error for not having internet.
    */
    return res.json({
      err: 1,
      code: "",
      message: token,
      data: {}
    });
  } else {
    
    if (token.access_token) {
      const user = await getUSerFromSalesforce(token.access_token, key_value_string);
      if(user.status === 200) {
        return res.json({
          err: 1,
          code: "",
          message: "Este usuario ya se encuentra registrado en salesforce",
          data: {
            origin: "signUp-001"
          }
        });
      } else {
        const findEmail = await Users.query({
          type: Users.types.FINDBYEMAIL,
          data: {
            key_value_string
          }
        });
        if (findEmail.length > 0) {
          return res.json({
            err: 1,
            code: "",
            message: "El campo key_value_string ya se encuentra registrado en MYSQL",
            data: {}
          });
        } else {
          const hash = await bcrypt.hash(c_password, SALT_ROUNDS);
          const user = await Users.query({
            type: Users.types.CREATE,
            data: {
              key_value_string,
              c_firstName,
              c_lastName,
              c_password: hash,
              c_status
            }
          });
      
          if (user.error) {
            return res.status(400).json({
              message: user.error
            });
          }
          res.status(201).json({
            err: 0,
            code: "",
            message: "Usuario creado",
            data: {

            }
          });
          
        }
      }
    } else {
      return res.json({
        err: 1,
        code: "",
        message: "ocurrió un error en el servidor",
        data: {
          origin: "signUp-003"
        }
      });
    }
  }

};

const signIn = async (req, res, next) => {
  const {
    key_value_string,
    c_firstName,
    c_password
  } = req.body;

  const token = await getToken();
  if (token === "ENOTFOUND") {
    return res.json({
      err: 1,
      code: "",
      message: token,
      data: {}
    });
  } else {
    if (token.access_token) {
      const user = await getUSerFromSalesforce(token.access_token, key_value_string);
      if(user.status === 200) {
        console.log("Data...");
        console.log(user.data);
        if(user.data.c_password === c_password) {
          return res.json({
            err: 0,
            code: "",
            message: "Iniciaste sesión como administrador de salesforce",
            data: {
              origin: ""
            }
          });
        } else {
          return res.json({
            err: 1,
            code: "",
            message: "La contraseña no coincide con este usuario de salesforce.",
            data: {
              origin: ""
            }
          });
        }
        
      } else {
        const findUserByEmail = await Users.query({
          type: Users.types.FINDBYEMAIL,
          data: {
            key_value_string
          }
        });
        if (findUserByEmail.length === 0) {
          return res.json({
            err: 1,
            code: "",
            message: "No existe registro con ese correo",
            data: {}
          });
        } else {
          console.log(findUserByEmail[0].c_password);
          const isValid = await bcrypt.compare(c_password, findUserByEmail[0].c_password);

          if (!isValid) {
            return res.json({
              err: 1,
              code: "",
              message: "La contraseña no coincide con este usuario de MYSQL.",
              data: {}
            });
          }
          return res.json({
            err: 0,
            code: "",
            message: "Iniciaste sesión como un usuario sin permisos de administrado",
            data: {}
          });
          /*if(hash === findEmail[0].c_password) {
            
          } else {
            
          }*/
          /*
          console.log(hash);
          const user = await Users.query({
            type: Users.types.CREATE,
            data: {
              key_value_string,
              c_firstName,
              c_lastName,
              c_password: hash,
              c_status
            }
          });
      
          if (user.error) {
            return res.status(400).json({
              message: user.error
            });
          }
          */
          
        }
        next();
      }
    } else {
      return res.json({
        err: 1,
        code: "",
        message: "ocurrió un error en el servidor",
        data: {
          origin: "signUp-003"
        }
      });
    }
  }
  /*

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
        err: 1,
        code: "",
        message: "Usuario o contraseña  incorrectos.",
        data: {}
      });
  }

  
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
  next();*/
};

const updateUser = async (req, res, next) => {
  console.log(req.body);
  console.log(res.params.body);

  return;
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