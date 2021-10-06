'use strict';

const CategoryService = require('../../service/category');
const HttpStatusCode = require('../../constant/http-status-code');
const Util = require('../../util');

exports.deleteCategory = async (req, res) => {
    const { ctx, params } = req;

    try {
        await CategoryService.destroyCategory(ctx, { id: params.categoryId });
        const response = Util.formatSuccessResponse(ctx.get('requestAt'), HttpStatusCode.OK);

        return res.status(HttpStatusCode.OK).json(response);
    } catch (err) {
        const response = Util.formatErrorResponse(ctx.get('requestAt'), err);
        const statusCode = response?.meta?.code || HttpStatusCode.INTERNAL_SERVER_ERROR;

        // logging for 500 error
        if (statusCode === HttpStatusCode.INTERNAL_SERVER_ERROR && process.env.NODE_ENV !== 'test') {
            Util.loggingError(err);
        }

        return res.status(statusCode).json(response);
    }
};

module.exports = exports;
