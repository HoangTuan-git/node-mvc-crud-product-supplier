const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

// GET /suppliers - Danh sách nhà cung cấp
router.get('/', supplierController.index);

// GET /suppliers/new - Form thêm nhà cung cấp
router.get('/new', supplierController.new);

// POST /suppliers - Tạo nhà cung cấp mới
router.post('/', supplierController.create);

// GET /suppliers/:id - Chi tiết nhà cung cấp
router.get('/:id', supplierController.show);

// GET /suppliers/:id/edit - Form sửa nhà cung cấp
router.get('/:id/edit', supplierController.edit);

// PUT /suppliers/:id - Cập nhật nhà cung cấp
router.put('/:id', supplierController.update);

// DELETE /suppliers/:id - Xóa nhà cung cấp
router.delete('/:id', supplierController.destroy);

module.exports = router;