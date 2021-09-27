const controller_object = {};
const bcrypt = require('bcrypt');
const { pool } = require("../config/config");
const uuid = require('uuid');
const response = require("../utils/response");

controller_object.register = async(req,res,next) => {
    const {  nama, nip, mk, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // jika field tidak sesuai
    pool.query(`SELECT * FROM public.users_table WHERE nip = $1`, [nip], (err, results) => {
        if (err) {
            throw err
        }
        if (results.rows.length > 0) {
            response.responseFailed(res, "NIP sudah teregistrasi");
            return;
        }
        else {
            pool.query(`SELECT * FROM public.users_table WHERE username = $1`, [username], (err, results) => {
                if (err) {
                    throw err
                }
                if (results.rows.length > 0) {
                    response.responseFailed(res, "username sudah digunakan");
                    return;
                }
                else {
                    pool.query(`INSERT INTO public.users_table (id, nama, nip, mk, username, password, role, create_at) VALUES ($1, $2, $3, $4, $5, $6, $7, now())`, [uuid.v4(), nama, nip, mk, username, hashedPassword, 'dosen'], (err, results) => { 
                        if (err) { 
                            throw err;
                        } 
                        response.responseSuccess(res, 'Registrasi sukses');
                        return;
                    })
                }                
            })
        }
    });
};

module.exports = controller_object;