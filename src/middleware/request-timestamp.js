'use strict';

module.exports = async (req, res, next) => {
    req.ctx.set('requestAt', new Date());

    next();
};
