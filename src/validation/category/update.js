'use strict';

const Joi = require('joi');

module.exports = function (language) {
    return Joi.object().keys({
        id: Joi.string().required().error(new Error(language.ID_NOT_VALID)),
        name: Joi.string().min(3).max(50).required().error(new Error(language.CATEGORY_NAME_NOT_VALID))
    });
};
