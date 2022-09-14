import axios from "axios";
import qs from "qs";


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
        res.status(201).json({
            message: "Usuario logueado como admin",
            data: resp.data
        });
    } catch (error) {
        next();
    }
}

export {
    existUserSalesforce
};