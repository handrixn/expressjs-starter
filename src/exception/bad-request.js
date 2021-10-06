'use strict';

const errorNameConstant = require('../constant/error-name');

module.exports = function (message) {
    const badRequestError = new Error();
    badRequestError.name = errorNameConstant.BAD_REQUEST_ERROR;
    badRequestError.message = message;

    return badRequestError;
};
