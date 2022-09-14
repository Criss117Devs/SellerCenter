import { Router } from "express";
import { check } from 'express-validator';
import {
    signIn,
    signUp,
    updateUser
} from "../controllers/users.js";
import { existUserSalesforce } from "../helpers/dbValidations.js";
import { validateFields } from "../middlewares/validateFields.js";

const router = Router();

router.post("/signUp", [
    check("key_value_string", "El email esta vacio").not().isEmpty().trim(),
    check("key_value_string", "El email no es valido").isEmail(),
    /*
        check("c_firstName", "El username esta vacio").not().isEmpty().trim(),
        check("c_lastName", "El lastname esta vacio").not().isEmpty().trim(),
        check("c_password", "El password debe tener almenos 10 caracteres").isLength({min: 10}),
        check("c_password", "El password esta vacio").not().isEmpty().trim(),

        check("c_status", "El status esta vacio").not().isEmpty().trim(),
        check("c_status", "El status tiene que ser active").equals("active"),
        validateFields*/
], signUp);

router.post("/signin", [
    check("c_firstName", "El lastname esta vacio").not().isEmpty().trim(),
    check("c_password", "El password debe tener almenos 10 caracteres").isLength({min: 10}),
    existUserSalesforce,
    validateFields
], signIn);

router.put("/updateUser/:id", [

    /*check("id").custom(isIdMYSQL), 
    check("role").custom(isRoleValid),
    isUserRole,
    validEmptyFields,
    validateFields*/
], updateUser);


export default router;
// https://stackoverflow.com/questions/50592190/how-to-use-equals-in-express-validator