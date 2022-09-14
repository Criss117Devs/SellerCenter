import { Router } from "express";
import { check } from 'express-validator';
import {
    signIn,
    signUp,
    updateUser
} from "../controllers/users.js";
import { existUserSalesforce, findByCredentials, findUSerInSalesforce } from "../helpers/dbValidations.js";
import { validateFields } from "../middlewares/validateFields.js";

const router = Router();

router.post("/signUp", [
    check("key_value_string", "El campo key_value_string está vacío o estás ingresando espacios en blanco.").trim().not().isEmpty(),
    check("key_value_string", "El campo key_value_string no es un email válido.").isEmail(),
    check("c_firstName", "El campo c_firstName está vacío o estás ingresando espacios en blanco.").trim().not().isEmpty(),
    check("c_lastName", "El campo c_lastName está vacío o estás ingresando espacios en blanco.").trim().not().isEmpty(),
    check("c_password", "El campo c_password debe tener al menos 10 caracteres.").isLength({min: 10}),
    check("c_password", "El campo c_password está vacío o estás ingresando espacios en blanco.").trim().not().isEmpty(),
    check("c_status", "El campo c_status está vacío o estás ingresando espacios en blanco.").trim().not().isEmpty(),
    check("c_status", "El campo status tiene que ser active").equals("active"),
    validateFields,
], signUp);

router.post("/signin", [
    check("c_firstName", "El campo c_lastName está vacío o estás ingresando espacios en blanco.").trim().not().isEmpty(),
    check("c_password", "El campo c_password está vacío o estás ingresando espacios en blanco.").trim().not().isEmpty(),
    existUserSalesforce,
    validateFields
], signIn);

router.put("/updateUser/:id", [
], updateUser);

export default router;
// https://stackoverflow.com/questions/50592190/how-to-use-equals-in-express-validator