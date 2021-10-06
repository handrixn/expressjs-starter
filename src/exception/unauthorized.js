'use strict';

const errorNameConstant = require('../constant/error-name');

module.exports = function (message) {
    const unauthorizedError = new Error();
    unauthorizedError.name = errorNameConstant.UNAUTHORIZED_ERROR;

    return unauthorizedError;
};
