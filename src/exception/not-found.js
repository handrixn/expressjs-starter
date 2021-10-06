'use strict';

const errorNameConstant = require('../constant/error-name');

module.exports = function (message) {
    const notFoundError = new Error();
    notFoundError.name = errorNameConstant.NOT_FOUND_ERROR;
    notFoundError.message = message;

    return notFoundError;
};
