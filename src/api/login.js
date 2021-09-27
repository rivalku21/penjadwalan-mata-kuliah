const controller_object = {};
const response = require("../utils/response");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { pool } = require("../config/config");

controller_object.login = async(req,res,next) => {
    const {username, password} = req.body;

    pool.query(`SELECT * FROM public.users_table WHERE username = $1`, [username], (err, result) => {
        if (err) {
            response.responseFailed(res, err);
            return;
        }
        if (!result.rows.length) {
            response.responseFailed(res, "Username Salah!");
            return;
        }
        else {
            const user = result.rows[0];

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    response.responseFailed(res, "Password Salah!");
                    return;
                }
                if (isMatch) {
                    const id = user.id;
                    const username = user.username;
                    const role = user.role;
                    
                    const token = jwt.sign({
                        username: username,
                        role: role,
                    },
                    // expired key
                    process.env.TOKEN_SECRET, {
                        expiresIn:'1h'
                    });

                    pool.query(`UPDATE public.users_table SET last_login = now() WHERE id = $1`, [id]);
                    return res.status(200).json({
                        id,
                        nama: user.nama,
                        role,
                        token,
                    })
                }
                else {
                    response.responseFailed(res, "Username atau Password salah!");
                    return;
                }
            });
        }
    });
}

module.exports = controller_object;