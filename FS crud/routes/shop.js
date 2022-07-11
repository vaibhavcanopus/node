const path = require('path');
const express = require('express');
const shopData = require('../controllers/shop');
const router = express.Router();


router.get('/',shopData.getproducts );
router.get('/edit-product/:productID' ,shopData.editproduct)
router.post('/edit-product/:productID',shopData.postEditProduct)
router.post('/delete',shopData.DeleteProduct)
router.get('/product/:delete')
router.get("/imageupload",shopData.postImage)

module.exports = router;
