const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /products - Danh sách sản phẩm
router.get('/', productController.index);

// GET /products/new - Form thêm sản phẩm
router.get('/new', productController.new);

// POST /products - Tạo sản phẩm mới
router.post('/', productController.create);

// GET /products/:id - Chi tiết sản phẩm
router.get('/:id', productController.show);

// GET /products/:id/edit - Form sửa sản phẩm
router.get('/:id/edit', productController.edit);

// PUT /products/:id - Cập nhật sản phẩm
router.put('/:id', productController.update);

// DELETE /products/:id - Xóa sản phẩm
router.delete('/:id', productController.destroy);

module.exports = router;