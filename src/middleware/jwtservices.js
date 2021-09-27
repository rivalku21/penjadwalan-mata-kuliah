const jwt = require('jsonwebtoken');
const response = require('../utils/response');

const authenticateTokenAdmin = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    var data = jwt.verify(token, process.env.TOKEN_SECRET);

    try {
        if (data.role == "admin") {
            next();
        } else {
            response.responseForbidden(res, "UNAUTHORIZED");
            return;
        }
    } catch (err) {
        response.responseForbidden(res, "UNAUTHORIZED");
        return;
    }
};

module.exports = {
    authenticateTokenAdmin,
};