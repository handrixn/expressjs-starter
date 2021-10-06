'use strict';

const Joi = require('joi');

module.exports = function (language) {
    return Joi.object().keys({
        search: Joi.string().max(30).allow(null, '').default(null).error(new Error(language.SEARCH_NOT_VALID)),
        limit: Joi.number().default(10).error(new Error(language.LIMIT_NOT_VALID)),
        page: Joi.number().default(1).error(new Error(language.PAGE_NOT_VALID))
    });
};
