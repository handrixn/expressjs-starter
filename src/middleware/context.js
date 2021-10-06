'use strict';

module.exports = async (req, res, next) => {
    const context = new Map();

    context.clear = () => {
        throw new Error('Can\'t clear context');
    };

    context.delete = () => {
        throw new Error('Can\'t delete context');
    };

    req.ctx = context;

    next();
};
