import Roles from "../models/roles.js";
import Users from "../models/users.js";

const isRoleValid = async(role = "") => {
    const userRole = await Roles.query({
        type: Roles.types.FIND,
        data: { role },
    });
    if(Object.keys(userRole).length === 0) {
        throw new Error("El rol no esta registrado");
    }
}

const isEmailUnique = async(email = "") => {
    const existEmail = await Users.query({
      type: Users.types.FINDBYEMAIL,
      data: { email },
    });
    if(Object.keys(existEmail).length > 0) {
        throw new Error("El correo ya esta registrado");
    }
    
}

const isIdMYSQL = async(id) => {
    if(id !== "") {
        const existID = await Users.query({
            type: Users.types.FIND,
            data: { id },
        });
        if(Object.keys(existID).length === 0) {
            throw new Error("No se encontro registro de usuario con ese ID");
        }
    } else {
        throw new Error("Ingrese el ID de usuario para actualizar");
    }
}

export { 
    isRoleValid,
    isEmailUnique,
    isIdMYSQL,
}

