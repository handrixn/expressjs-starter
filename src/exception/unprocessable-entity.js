'use strict';

const errorNameConstant = require('../constant/error-name');

module.exports = function (message) {
    const unprocessableEntityError = new Error();
    unprocessableEntityError.name = errorNameConstant.UNPROCESSABLE_ENTITY_ERROR;
    unprocessableEntityError.message = message;

    return unprocessableEntityError;
};
