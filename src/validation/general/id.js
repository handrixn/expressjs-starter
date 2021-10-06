'use strict';

const Joi = require('joi');

module.exports = function (language) {
    return Joi.object().keys({
        id: Joi.string().required().error(new Error(language.ID_NOT_VALID))
    });
};
