'use strict';

const test = require('ava');
const sinon = require('sinon');
const { CreateMockRequest, CreateMockResponse } = require('starter-module');
const CategoryRepository = require('../../../../src/repository/category');
const CategoryMethod = require('../../../../src/method/category/create');
const Language = require('../../../../src/language');

let sandbox;

test.beforeEach((t) => {
    sandbox = sinon.createSandbox();
});

test.afterEach.always((t) => {
    sandbox.restore();
});

const language = Language.getLanguage('en');

test.serial('Should create category', async (t) => {
    const body = { name: 'Gaming' };
    const category = {
        id: 1,
        uuid: 'xxxxxxxxxxx',
        name: 'Gaming',
        created_at: '2021-08-03 11:02:08',
        updated_at: '2021-08-27 23:16:09'
    };

    const CategoryRepositoryFindOneSpy = sandbox.stub(CategoryRepository, 'findOne').withArgs(body).returns(null);
    const CategoryRepositoryCreateSpy = sandbox.stub(CategoryRepository, 'create').withArgs(body).returns(category);

    try {
        const res = CreateMockResponse();
        const req = CreateMockRequest();
        req.ctx.set('requestAt', new Date()).set('language', language);

        req.body = body;

        const result = await CategoryMethod.postCategory(req, res);

        const responseData = {
            id: category.uuid,
            name: category.name
        };

        t.is(res.code, 201);
        t.true(CategoryRepositoryFindOneSpy.calledOnce);
        t.true(CategoryRepositoryCreateSpy.calledOnce);

        t.deepEqual(result.data, responseData);
    } catch (err) {
        console.log(err);
        t.fail();
    }
});

test.serial('Should return error validation error', async (t) => {
    const body = { name: '' };

    const CategoryRepositoryFindOneSpy = sandbox.stub(CategoryRepository, 'findOne');
    const CategoryRepositoryCreateSpy = sandbox.stub(CategoryRepository, 'create');

    try {
        const res = CreateMockResponse();
        const req = CreateMockRequest();
        req.ctx.set('requestAt', new Date()).set('language', language);

        req.body = body;

        const result = await CategoryMethod.postCategory(req, res);

        t.is(res.code, 400);
        t.true(CategoryRepositoryFindOneSpy.notCalled);
        t.true(CategoryRepositoryCreateSpy.notCalled);

        t.deepEqual(result.meta.message, language.CATEGORY_NAME_NOT_VALID);
    } catch (err) {
        console.log(err);
        t.fail();
    }
});

test.serial('Should return error duplicate data', async (t) => {
    const body = { name: 'Gaming' };
    const category = {
        id: 1,
        uuid: 'xxxxxxxxxxx',
        name: 'Gaming',
        created_at: '2021-08-03 11:02:08',
        updated_at: '2021-08-27 23:16:09'
    };

    const CategoryRepositoryFindOneSpy = sandbox.stub(CategoryRepository, 'findOne').withArgs(body).returns(category);
    const CategoryRepositoryCreateSpy = sandbox.stub(CategoryRepository, 'create').withArgs(body).returns(null);

    try {
        const res = CreateMockResponse();
        const req = CreateMockRequest();
        req.ctx.set('requestAt', new Date()).set('language', language);

        req.body = body;

        const result = await CategoryMethod.postCategory(req, res);

        t.is(res.code, 422);
        t.true(CategoryRepositoryFindOneSpy.calledOnce);
        t.true(CategoryRepositoryCreateSpy.notCalled);

        t.deepEqual(result.meta.message, language.DUPLICATE_DATA);
    } catch (err) {
        console.log(err);
        t.fail();
    }
});

test.serial('Should return internal server error', async (t) => {
    const body = { name: 'Gaming' };
    const CategoryRepositoryFindOneSpy = sandbox.stub(CategoryRepository, 'findOne').withArgs(body).throws(new Error('Connection refused'));
    const CategoryRepositoryCreateSpy = sandbox.stub(CategoryRepository, 'create').withArgs(body).returns(null);

    try {
        const res = CreateMockResponse();
        const req = CreateMockRequest();
        req.ctx.set('requestAt', new Date()).set('language', language);

        req.body = body;

        const result = await CategoryMethod.postCategory(req, res);

        t.is(res.code, 500);
        t.true(CategoryRepositoryFindOneSpy.calledOnce);
        t.true(CategoryRepositoryCreateSpy.notCalled);
        t.deepEqual(result.meta.status, language.INTERNAL_SERVER_ERROR);
    } catch (err) {
        console.log(err);
        t.fail();
    }
});
