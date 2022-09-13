import { validationResult } from "express-validator";
import Users from "../models/users.js";
import fetch from "node-fetch";
import axios from 'axios';

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(errors);
  }
  next();
};

const isUserRole = async (req, res, next) => {
  const { id } = req.params;
  const { idUser } = req.body;

  const user = await Users.query({
    type: Users.types.FIND,
    data: { id },
  });

  if (user[0].role === "USER_ROLE" && idUser !== id) {
    return res.status(400).json({
      mesj: "No cuentas con los permisos de administrador para actualizar el usurio",
    });
  }
  next();
};

const validEmptyFields = async (req, res, next) => {
  const objectUSer = req.body;
  let errors = [];
  for (const property in objectUSer) {
    switch (property) {
      case "firstName":
        if (isEmptyProperty(objectUSer[property]))
          errors.push({
            msj: `Propiedad ${property} esta definidad, pero su valor es vacio`,
          });
        break;
      case "lastName":
        if (isEmptyProperty(objectUSer[property]))
          errors.push({
            msj: `Propiedad ${property} esta definidad, pero su valor es vacio`,
          });
        break;
      case "email":
        if (isEmptyProperty(objectUSer[property]))
          errors.push({
            msj: `Propiedad ${property} esta definidad, pero su valor es vacio`,
          });
        if (!isEmailValid(objectUSer[property]))
          errors.push({
            msj: `Propiedad ${property} no es un campo de tipo correo`,
          });
        break;
      case "status":
        if (isEmptyProperty(objectUSer[property]))
          errors.push({
            msj: `Propiedad ${property} esta definidad, pero su valor es vacio`,
          });
        break;
      case "role":
        if (isEmptyProperty(objectUSer[property]))
          errors.push({
            msj: `Propiedad ${property} esta definidad, pero su valor es vacio`,
          });
        break;
      case "idUSer":
        if (isEmptyProperty(objectUSer[property]))
          errors.push({
            msj: `Propiedad ${property} esta definidad, pero su valor es vacio`,
          });
        break;
      default:
        errors.push({ msj: `Propiedad ${property} no definidad` });
        break;
    }
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      mesj: errors,
    });
  }
  next();
};

const isAdminUser = async (req, res, next) => {
    const { id } = req.params;
    var data = JSON.stringify({
      "allocation": {
        "amount": 300
      }
    });
    
    var config = {
      method: 'get',
      url: 'https://bjqc-002.sandbox.us01.dx.commercecloud.salesforce.com/s/Sites-Site/dw/data/v20_9/custom_objects/SellerCenterAdmins/cristian.gutierrez@puntocommerce.com',
      headers: { 
        'x-dw-client-id': '{{clientid}}', 
        'Authorization': 'Bearer jcvDE6EABMUBbX7Gyb586NMrRos', 
        'Origin': '{{origin_url}}', 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    const a = await axios(config);
    const user = await Users.query({
        type: Users.types.FIND,
        data: { id },
    });
    
    
    if (isAdminRole(a.data.key_value_string, user[0].key_value_string)) {
        next();
    } else {
        return res.status(400).json({
            mesj: "No cuentas con permisos para actualizar este usuario.",
        });
    }

    
};

const isAdminRole = (emailUSer, email) => {
    if(emailUSer === email) return true;
    return false;
}

const isEmptyProperty = (property) => {
  if (property === "") return true;
  return false;
};

const isEmailValid = (email = "") => {
  let regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email) ? true : false;
};

export { validateFields, isUserRole, validEmptyFields, isAdminUser };
