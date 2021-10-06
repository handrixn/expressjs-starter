'use strict';

const Language = require('../language');

module.exports = async (req, res, next) => {
    const headers = req.headers || {};
    const acceptLanguage = headers['Accept-Language'] || headers['accept-language'] || headers.Locale || headers.locale || '';

    const lang = Language.getLanguage(acceptLanguage);

    req.ctx.set('language', lang);

    next();
};
