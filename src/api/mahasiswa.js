const controller_object = {};
const { pool } = require('../config/config');
const response = require('../utils/response');
const uuid = require('uuid');

controller_object.createMahasiswa = async(req, res, next) => {
    const { nama, mata_kuliah } = req.body;

    const matkul = `{${mata_kuliah}}`;

    pool.query(`SELECT * FROM public.mahasiswa WHERE nama = $1`, [nama], (err, results) => {
        if (err) throw err;
        if (results.rows.length > 0) {
            response.responseFailed(res, "Mahasiswa sudah terdaftar");
            return;
        }
        else {
            pool.query(`INSERT INTO public.mahasiswa (id, nama, mata_kuliah, create_at) VALUEs ($1, $2, $3, now())`, [uuid.v4(), nama, matkul], (err, results) => {
                if (err) throw err;
                response.responseSuccess(res, "Mahasiswa sukses didaftarkan");
                return;
            })
        }
    })
};

controller_object.readAllMahasiswa = async(req, res, next) => {
    pool.query(`SELECT public.mahasiswa.id, public.mahasiswa.nama, public.mahasiswa.mata_kuliah FROM public.mahasiswa`, (err, results) => {
        if(err) throw err;
        response.responseSuccess(res, results.rows);
        return;
    })
};

controller_object.readMahasiswaById = async(req, res, next) => {
    const id = req.params.id;

    pool.query(`SELECT public.mahasiswa.id, public.mahasiswa.nama, public.mahasiswa.mata_kuliah FROM public.mahasiswa WHERE id = $1`, [id], (err, results) => {
        if (err) throw err;
        response.responseSuccess(res, results.rows);
        return;
    })
};

controller_object.updateMahasiswa = async(req, res, next) => {
    const id = req.params.id;
    const { nama, mata_kuliah } = req.body;

    const matkul = `{${mata_kuliah}}`;

    pool.query('UPDATE public.mahasiswa SET nama = $1, mata_kuliah = $2, update_at = now() WHERE id = $3', [nama, matkul, id], (err, result) => {
        if (err) throw err
        response.responseSuccess(res, "Data mahasiswa sukses diperbarui");
        return;
    })
};

controller_object.deleteMahasiswa = async(req, res, next) => {
    const id = req.params.id;

    pool.query(`DELETE FROM public.mahasiswa WHERE id = $1`, [id], (err, results) => {
        if (err) throw err;
        response.responseSuccess(res, "Data Mahasiswa sukses dihapus");
        return;
    })
};

module.exports = controller_object;