const path = require('path');
const express = require('express');
const router = express.Router();
const products = [];
const admindata = require('../controllers/product')


// /admin/add-product => GET
router.get('/add-product',admindata.getAddProduct );

// /admin/add-product => POST
router.post('/add-product', admindata.postAddProduct);

exports.routes = router;
exports.products = products;
