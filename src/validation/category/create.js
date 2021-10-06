'use strict';

const Joi = require('joi');

module.exports = function (language) {
    return Joi.object().keys({
        name: Joi.string().min(3).max(50).required().error(new Error(language.CATEGORY_NAME_NOT_VALID))
    });
};
