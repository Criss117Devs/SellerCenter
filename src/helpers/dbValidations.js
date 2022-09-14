import axios from "axios";
import qs from "qs";
import Users from "../models/users.js";

const toBase64 = (string) => {
    return Buffer.from(string).toString('base64');
}

const existUserSalesforce = async (req, res, next) => {
    const {
        c_firstName,
        c_password
    } = req.body;
    var data = qs.stringify({
        'grant_type': 'client_credentials'
    });
    var config = {
        method: 'post',
        url: 'https://account.demandware.com/dw/oauth2/access_token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + toBase64(c_firstName + ":" + c_password)
        },
        data: data
    };
    try {
        const resp = await axios(config);
        res.status(200).json({
            message: "Usuario logueado como administrador.",
            data: resp.data
        });
    } catch (error) {
        next();
    }
}

const findUSerInSalesforce = async(req, res, next) => {
    
    const {
        c_firstName,
        c_password
    } = req.body;
   
    try {
        var data = qs.stringify({
            'grant_type': 'client_credentials'
        });
        var config = {
            method: 'post',
            url: 'https://account.demandware.com/dw/oauth2/access_token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + toBase64(c_firstName + ":" + c_password)
            },
            data: data
        };
        try {
            const resp = await axios(config);
            return  res.status(200).json({
                message: "El usuario ya se encuentra logueado como administrador.",
            });
        } catch (error) {

            if(error.code === "ENOTFOUND") {
                return  res.status(200).json({
                    message: "Ocurrió un error con el servidor",
                });
            } else if(error.code === "ENOTFOUND") {
                return  res.status(200).json({
                    message: "Ocurrió un error con el servidor",
                });
            } else {
                console.log("Llego al next");
                next();
            }
        }
    } catch (error) {
        console.log("2");
        console.log(error.code);
        console.log(error);
        next();
    }
}

const findByCredentials = async(req, res, next) => {
    const {
        key_value_string,
        c_firstName
    } = req.body;
    try {
        const user = await Users.query({
            type: Users.types.FINDBYCREDENTIALS,
            data: {
                key_value_string,
                c_firstName
            },
        });
        if(user.length > 0) {
            return res.status(200).json({
                message: "El campo usuario o el campo key_value_string ya se encuentra registrado",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log("3");
        console.log(error.code);
        next();
    }
}

export {
    existUserSalesforce,
    findUSerInSalesforce,
    findByCredentials
};