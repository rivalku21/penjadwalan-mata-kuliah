const jwt = require('jsonwebtoken');
const response = require('../utils/response');

module.exports = {
    validateRegister: (req, res, next) => {
        var upperCaseLetters = /[A-Z]/g; //uppercase letter
        var lowerCaseLetters = /[a-z]/g; //lowercase letter
        var numbers = /[0-9]/g; //angka
        var spesialChar = /[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]/g; //character spesial
        const { nama, nip, mk, username, password } = req.body;

        // any null data
        if (!nama || !nip || !mk || !username || !password ) {
            response.responseFailed(res, "Tolong isi semua form");
            return;
        }
        if (username.match(upperCaseLetters)) {
            response.responseFailed(res, "Username harus huruf kecil semua");
            return;
        }
        // password strong validation
        if (password.length < 8) {
            response.responseFailed(res, "Password harus lebih dari 8 karakter");
            return;
        }
        if (!password.match(upperCaseLetters) || !password.match(lowerCaseLetters)) {
            response.responseFailed(res, "Password harus memiliki kombinasi huruf besar dan huruf kecil");
            return;
        }
        if (!password.match(numbers)) {
            response.responseFailed(res, "Password harus memiliki minimal 1 angka");
            return;
        }
        if (!password.match(spesialChar)) {
            response.responseFailed(res, "Password harus memiliki minimal 1 karakter spesial");
            return;
        }

        next();
    },

    // middleware/users.js

    isLoggedIn: (req, res, next) => {
        try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(
            token,
            process.env.TOKEN_SECRET
        );
        req.userData = decoded;
        next();
        } catch (err) {
        return res.status(401).send({
            msg: 'Your session is not valid!'
        });
        }
    }
};