'use strict';

const errorNameConstant = require('../constant/error-name');
const HttpStatusCode = require('../constant/http-status-code');

const buildResponseStatus = (code, status, message = null) => ({
    code,
    status,
    message: message || ''
});

const buildResponseMeta = (requestAt, responseStatus) => ({
    took: new Date() - requestAt,
    ...responseStatus
});

const buildResponsePaging = (paging) => {
    if (!paging) {
        return {};
    }

    return {
        page: paging.page,
        limit: paging.limit,
        totalData: paging.totalData,
        totalPage: paging.totalPage
    };
};

const buildBadRequestResponse = (requestAt, message) => ({
    meta: buildResponseMeta(requestAt, buildResponseStatus(400, 'Bad Request', message))
});

const buildUnprocessableEntityResponse = (requestAt, message) => ({
    meta: buildResponseMeta(requestAt, buildResponseStatus(422, 'Unprocessable Entity', message))
});

const buildUnauthorizedResponse = (requestAt) => ({
    meta: buildResponseMeta(requestAt, buildResponseStatus(401, 'Unauthorized'))
});

const buildForbiddenResponse = (requestAt) => ({
    meta: buildResponseMeta(requestAt, buildResponseStatus(403, 'Fobidden'))
});

const buildNotFoundResponse = (requestAt, message) => ({
    meta: buildResponseMeta(requestAt, buildResponseStatus(404, 'Not Found', message))
});

const buildInternalServerResponse = (requestAt) => ({
    meta: buildResponseMeta(requestAt, buildResponseStatus(500, 'Internal Server Error'))
});

const buiildCreatedResponse = (requestAt, data) => ({
    meta: buildResponseMeta(requestAt, buildResponseStatus(201, 'Created')),
    data
});

const buiildSuccessResponse = (requestAt, data, paging = null) => {
    const response = {
        meta: buildResponseMeta(requestAt, buildResponseStatus(200, 'Ok')),
        data
    };

    if (paging) {
        response.pagination = buildResponsePaging(paging);
    }

    return response;
};

const formatSuccessResponse = (requestAt, statusCode, data, paging = null) => {
    if (statusCode === HttpStatusCode.CREATED) {
        return buiildCreatedResponse(requestAt, data);
    }

    return buiildSuccessResponse(requestAt, data, paging);
};

const formatErrorResponse = (requestAt, err) => {
    if (err.name === errorNameConstant.BAD_REQUEST_ERROR) {
        return buildBadRequestResponse(requestAt, err.message);
    }

    if (err.name === errorNameConstant.UNPROCESSABLE_ENTITY_ERROR) {
        return buildUnprocessableEntityResponse(requestAt, err.message);
    }

    if (err.name === errorNameConstant.NOT_FOUND_ERROR) {
        return buildNotFoundResponse(requestAt, err.message);
    }

    if (err.name === errorNameConstant.FORBIDDEN_ERROR) {
        return buildForbiddenResponse(requestAt);
    }

    if (err.name === errorNameConstant.UNAUTHORIZED_ERROR) {
        return buildUnauthorizedResponse(requestAt);
    }

    return buildInternalServerResponse(requestAt);
};

exports.formatErrorResponse = formatErrorResponse;
exports.formatSuccessResponse = formatSuccessResponse;

module.exports = exports;
