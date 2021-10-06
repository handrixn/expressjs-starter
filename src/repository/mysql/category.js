'use strict';

const { Mysql: Models } = require('starter-module');

exports.create = function (payload) {
    return Models.Category.create(payload);
};

exports.update = function (where, payload) {
    return Models.Category.update(payload, { where });
};

exports.destroy = function (where) {
    return Models.Category.destroy({ where });
};

exports.findOne = function (where) {
    return Models.Category.findOne({ where });
};

exports.findAll = function (where) {
    return Models.Category.findAll({ where });
};

exports.findAndCountAll = function (where, offset, limit, order) {
    return Models.Category.findAndCountAll({
        where,
        offset,
        limit,
        order
    });
};

module.exports = exports;
