import axios from "axios";
import qs from "qs";
import Users from "../models/users.js";

const toBase64 = (string) => {
    return Buffer.from(string).toString('base64');
}

const getToken = async () => {
    try {
      var data = qs.stringify({
        'grant_type': 'client_credentials'
      });
      var config = {
        method: 'post',
        url: 'https://account.demandware.com/dw/oauth2/access_token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic YWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhOmFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYQ=='
        },
        data: data
      };
      const token = await axios(config);
      return token.data;
    } catch (error) {
      return error.code;
    }
  }

export {
 getToken
};