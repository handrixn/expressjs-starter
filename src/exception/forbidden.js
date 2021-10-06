'use strict';

const errorNameConstant = require('../constant/error-name');

module.exports = function (message) {
    const forbiddenError = new Error();
    forbiddenError.name = errorNameConstant.FORBIDDEN_ERROR;

    return forbiddenError;
};
