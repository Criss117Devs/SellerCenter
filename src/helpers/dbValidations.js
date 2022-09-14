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
            message: "Usuario logueado como admin",
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
    console.log(c_firstName, c_password);
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
            res.status(200).json({
                message: "El usuario ya se encuentra registrado como admnistrador",
            });
        } catch (error) {
            next();
        }
    } catch (error) {
        console.log(error);
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
            res.status(200).json({
                message: "El usuario ya se encuentra registrado",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        next();
    }
}

export {
    existUserSalesforce,
    findUSerInSalesforce,
    findByCredentials
};