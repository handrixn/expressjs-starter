'use strict';

const Exception = require('../exception');
const HttpStatusCode = require('../constant/http-status-code');
const Util = require('../util');

module.exports = async (req, res) => {
    const lang = req.ctx.get('language');
    const notFoundError = Exception.NotFoundError(lang.PATH_NOT_FOUND);
    const response = Util.formatErrorResponse(req.ctx.get('requestAt'), notFoundError);

    return res.status(HttpStatusCode.NOT_FOUND).json(response);
};
