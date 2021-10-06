'use strict';

const setOffset = function (page, limit) {
    const pg = page ? parseInt(page) : 1;
    const lm = parseInt(limit);
    const offset = ((pg - 1) * lm);
    return offset || 0;
};

const setOrderSql = function (key, by, defaultOrder = []) {
    const order = [defaultOrder];

    const defaultKey = {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };

    if (key && by) {
        order[0][0] = defaultKey[key] || key;
        order[0][1] = by;
    }

    return order;
};

exports.setOffset = setOffset;
exports.setOrderSql = setOrderSql;

module.exports = exports;
