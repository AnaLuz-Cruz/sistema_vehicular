import jwt from "jsonwebtoken";

/*
|--------------------------------------------------------------------------
| Generar Token
|--------------------------------------------------------------------------
*/

const generateToken = (payload) => {

    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );

};

export {
    generateToken
};