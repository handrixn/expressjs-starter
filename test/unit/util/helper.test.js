'use strict';

const test = require('ava');
const Util = require('../../../src/util');

test('Set Offset Should return 0', (t) => {
    const expected = 0;
    const acutal = Util.setOffset(1, 10);
    t.is(expected, acutal);
});

test('Set Offset Should return 10', (t) => {
    const expected = 10;
    const acutal = Util.setOffset(2, 10);
    t.is(expected, acutal);
});

test('Set Offset Should return 0 with parameter page null', (t) => {
    const expected = 0;
    const acutal = Util.setOffset(null, 10);
    t.is(expected, acutal);
});

test('Set Order Should return value from fallback value', (t) => {
    const expected = [['created_at', 'asc']];
    const acutal = Util.setOrderSql(null, null, ['created_at', 'asc']);
    t.deepEqual(expected, acutal);
});

test('Set Order Should return value from paramater key & by', (t) => {
    const expected = [['name', 'desc']];
    const acutal = Util.setOrderSql('name', 'desc', ['created_at', 'asc']);
    t.deepEqual(expected, acutal);
});

test('Set Order Should return value from paramater key & by and not send fallback param order', (t) => {
    const expected = [['name', 'desc']];
    const acutal = Util.setOrderSql('name', 'desc');
    t.deepEqual(expected, acutal);
});
