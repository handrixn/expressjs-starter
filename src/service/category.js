'use strict';

const { Op } = require('starter-module').Mysql;
const CategoryRepository = require('../repository/mysql/category');
const CreateCategoryValidation = require('../validation/category/create');
const UpdateCategoryValidation = require('../validation/category/update');
const ListCategoryValidation = require('../validation/general/list');
const DetailCategoryValidation = require('../validation/general/id');
const Exception = require('../exception');
const Util = require('../util');

const createCategory = async (ctx, body) => {
    const lang = ctx.get('language');
    let input = {};

    try {
        input = await CreateCategoryValidation(lang).validateAsync(body);
    } catch (err) {
        throw Exception.ValidationError(err.message);
    }

    const payload = { name: input.name };

    let category = await CategoryRepository.findOne(payload);

    if (category) {
        throw Exception.UnprocessableEntityError(lang.DUPLICATE_DATA);
    }

    category = await CategoryRepository.create(payload);

    return category;
};

const getCategories = async (ctx, query) => {
    const lang = ctx.get('language');
    let input = {};

    try {
        input = await ListCategoryValidation(lang).validateAsync(query);
    } catch (err) {
        throw Exception.ValidationError(err.message);
    }

    const page = input.page;
    const limit = input.limit;
    const offset = Util.setOffset(page, limit);
    const order = [['created_at', 'desc']];
    const where = [];

    const { rows, count } = await CategoryRepository.findAndCountAll(where, offset, limit, order);

    const paging = {
        page,
        limit,
        totalData: count,
        totalPage: Math.ceil(count / limit)
    };

    return { rows, paging };
};

const getCategory = async (ctx, params) => {
    const lang = ctx.get('language');
    let input = {};

    try {
        input = await DetailCategoryValidation(lang).validateAsync(params);
    } catch (err) {
        throw Exception.ValidationError(err.message);
    }

    const category = await CategoryRepository.findOne({ uuid: input.id });

    if (!category) {
        throw Exception.NotFoundError(lang.DATA_NOT_FOUND);
    }

    return category;
};

const updateCategory = async (ctx, body) => {
    const lang = ctx.get('language');
    let input = {};

    try {
        input = await UpdateCategoryValidation(lang).validateAsync(body);
    } catch (err) {
        throw Exception.ValidationError(err.message);
    }

    let where = { uuid: input.id };

    let category = await CategoryRepository.findOne(where);

    if (!category) {
        throw Exception.NotFoundError(lang.DATA_NOT_FOUND);
    }

    where = {
        uuid: {
            [Op.ne]: input.id
        },
        name: input.name
    };

    category = await CategoryRepository.findOne(where);

    if (category) {
        throw Exception.UnprocessableEntityError(lang.DUPLICATE_DATA);
    }

    const payload = { name: input.name };

    await CategoryRepository.update({ uuid: input.id }, payload);

    category = await CategoryRepository.findOne({ uuid: input.id });

    return category;
};

const destroyCategory = async (ctx, params) => {
    const lang = ctx.get('language');
    let input = {};

    try {
        input = await DetailCategoryValidation(lang).validateAsync(params);
    } catch (err) {
        throw Exception.ValidationError(err.message);
    }

    const category = await CategoryRepository.findOne({ uuid: input.id });

    if (!category) {
        throw Exception.NotFoundError(lang.DATA_NOT_FOUND);
    }

    await CategoryRepository.destroy({ id: category.id });

    return null;
};

exports.createCategory = createCategory;
exports.getCategories = getCategories;
exports.getCategory = getCategory;
exports.updateCategory = updateCategory;
exports.destroyCategory = destroyCategory;

module.exports = exports;
