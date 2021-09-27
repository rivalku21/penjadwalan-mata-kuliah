const controller_object = {};
const { pool } = require('../config/config');
const response = require('../utils/response');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const { groupBy } = require('../utils/groupby');

controller_object.createMatkul = async(req, res, next) => {
    const { nama_matkul, kode_matkul, jadwal_hari, jadwal_jam } = req.body;

    pool.query(`SELECT * FROM public.matkul WHERE kode_matkul = $1`, [kode_matkul], (err, results) => {
        if (err) throw err;
        if (results.rows.length > 0) {
            response.responseFailed(res, "Kode Mata Kuliah sudah terdaftar");
            return;
        }
        else {
            pool.query(`INSERT INTO public.matkul (id, nama_matkul, kode_matkul, jadwal_hari, jadwal_jam, create_at) VALUES ($1, $2, $3, $4, $5, now())`, [uuid.v4(), nama_matkul, kode_matkul, jadwal_hari, jadwal_jam], (err, results) => {
                if (err) throw err;
                response.responseSuccess(res, "Mata Kuliah sukses dibuat");
                return;
            })
        }
    })
};

controller_object.readMatkul = async(req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    var data = jwt.verify(token, process.env.TOKEN_SECRET);
    const role = data.role;
    const username = data.username;

    if (role == 'admin') {
        pool.query(`SELECT public.users_table.nama AS nama_dosen, public.matkul.id, public.matkul.nama_matkul, public.matkul.kode_matkul, CONCAT(public.matkul.jadwal_hari, ' ', public.matkul.jadwal_jam) AS jadwal, public.mahasiswa.nama AS list_mahasiswa FROM public.users_table RIGHT JOIN public.matkul ON public.users_table.mk = public.matkul.kode_matkul LEFT JOIN public.mahasiswa ON public.matkul.kode_matkul = ANY(public.mahasiswa.mata_kuliah)`, (err, results) => {
            const data = results.rows;
    
            const hasil = groupBy('kode_matkul', data);
    
            if (err) throw err;
            response.responseSuccess(res, hasil);
            return;
        })
    }
    else {
        pool.query(`SELECT public.users_table.mk AS kode_matkul, public.matkul.nama_matkul, CONCAT(public.matkul.jadwal_hari, ' ', public.matkul.jadwal_jam) AS jadwal, public.mahasiswa.nama AS list_mahasiswa FROM public.users_table JOIN public.matkul ON public.users_table.mk = public.matkul.kode_matkul JOIN public.mahasiswa ON public.matkul.kode_matkul = ANY(public.mahasiswa.mata_kuliah) WHERE username = $1`, [username], (err, results) => {
            const data = results.rows;

            const hasil = groupBy('kode_matkul', data);
            
            if (err) throw err;
            else {
                response.responseSuccess(res, hasil);
                return;
            }
        })
    }
};

controller_object.updateMatkul = async(req, res, next) => {
    const id = req.params.id;
    const { nama_matkul, kode_matkul, jadwal_hari, jadwal_jam } = req.body;

    pool.query('UPDATE public.matkul SET nama_matkul = $1, kode_matkul = $2, jadwal_hari = $3, jadwal_jam = $4, update_at = now() WHERE id = $5', [nama_matkul, kode_matkul, jadwal_hari, jadwal_jam, id], (err, result) => {
        if (err) throw err
        response.responseSuccess(res, "Mata Kuliah sukses diperbarui");
        return;
    })
};

controller_object.deleteMatkul = async(req, res, next) => {
    const id = req.params.id;

    pool.query(`DELETE FROM public.matkul WHERE id = $1`, [id], (err, results) => {
        if (err) throw err;
        response.responseSuccess(res, "Mata Kuliah sukses dihapus");
        return;
    })
};

module.exports = controller_object;