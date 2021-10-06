'use strict';

const en = require('./en');
const id = require('./id');

const getLanguage = (ln) => {
    if (ln === 'id') {
        return id;
    }

    return en;
};

exports.getLanguage = getLanguage;

module.exports = exports;
