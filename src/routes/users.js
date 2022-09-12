import { Router } from "express";
import { check } from 'express-validator';
import {
    signIn,
    signUp,
    updateUser,
} from "../controllers/users.js";
import { 
    isRoleValid,
    isEmailUnique,
    isIdMYSQL,
} from "../helpers/dbValidations.js";
import {
    validateFields,
    isUserRole,
    validEmptyFields,
    isAdminUser,
} from "../middlewares/validateFields.js";

const router = Router();

router.post("/signUp",[
    check("firstName", "El username esta vacio").not().isEmpty().trim(),
    check("lastName", "El lastname esta vacio").not().isEmpty().trim(),
    check("password", "El password debe tener almenos 10 caracteres").isLength({min: 10}),
    check("password", "El password esta vacio").not().isEmpty().trim(),
    check("email").custom(isEmailUnique), 
    check("email", "El email no es valido").isEmail(),
    check("email", "El email esta vacio").not().isEmpty().trim(),
    check("status", "El status esta vacio").not().isEmpty().trim(),
    check("role", "El rol  esta vacio").not().isEmpty().trim(),
    check("role").custom(isRoleValid), 
    //check("role").custom((role) => isRoleValid(role)), 
    //check("rol", "No es un rol valida").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    validateFields
], signUp);

router.post("/signin", signIn);

router.put("/updateUser/:id",[
    isAdminUser,
    check("id").custom(isIdMYSQL), 
    check("role").custom(isRoleValid),
    isUserRole,
    validEmptyFields,
    validateFields
],updateUser);


export default router;