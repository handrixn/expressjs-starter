'use strict';

const router = require('express').Router();

router.get('/categories', [], (require('./method/category/list')).getCategory);
router.post('/categories', [], (require('./method/category/create')).postCategory);
router.get('/categories/:categoryId', [], (require('./method/category/detail')).getCategory);
router.put('/categories/:categoryId', [], (require('./method/category/update')).putCategory);
router.delete('/categories/:categoryId', [], (require('./method/category/destroy')).deleteCategory);

router.get('/ping', [], (req, res) => res.status(200).json({ message: 'PONG!!!' }));

module.exports = router;
