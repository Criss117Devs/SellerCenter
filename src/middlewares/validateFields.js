import { validationResult } from "express-validator";

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      err: 1,
        code: "",
        message: "Campos del formulario.",
        data: errors
    });
  }
  next();
};

const isEmptyProperty = (property) => {
  if (property === "") return true;
  return false;
};

const isEmailValid = (email = "") => {
  let regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email) ? true : false;
};

export { validateFields };
