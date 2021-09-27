const express = require('express');
const router = express.Router();
const userMiddleware = require('../middleware/users');
const jwtservices = require('../middleware/jwtservices');

const api = require('../api/api');
const login = require('../api/login');
const register = require('../api/register');
const matkul = require('../api/matkul');
const mahasiswa = require('../api/mahasiswa');

router.get('/', api.contoh_fungsi);
router.post('/register', userMiddleware.validateRegister, register.register);
router.post('/login', login.login);
router.route('/matkul')
    .get(userMiddleware.isLoggedIn, matkul.readMatkul)
    .post(userMiddleware.isLoggedIn, jwtservices.authenticateTokenAdmin, matkul.createMatkul);
router.route('/matkul/:id')
    .put(userMiddleware.isLoggedIn, jwtservices.authenticateTokenAdmin, matkul.updateMatkul)
    .delete(userMiddleware.isLoggedIn, jwtservices.authenticateTokenAdmin, matkul.deleteMatkul);
router.route('/mahasiswa')
    .get(userMiddleware.isLoggedIn, mahasiswa.readAllMahasiswa)
    .post(userMiddleware.isLoggedIn, jwtservices.authenticateTokenAdmin, mahasiswa.createMahasiswa);
router.route('/mahasiswa/:id')
    .get(userMiddleware.isLoggedIn, mahasiswa.readMahasiswaById)
    .put(userMiddleware.isLoggedIn, jwtservices.authenticateTokenAdmin, mahasiswa.updateMahasiswa)
    .delete(userMiddleware.isLoggedIn, jwtservices.authenticateTokenAdmin, mahasiswa.deleteMahasiswa);
module.exports = router;