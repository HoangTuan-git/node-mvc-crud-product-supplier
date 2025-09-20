const Supplier = require('../models/Supplier');
const Product = require('../models/Product');

const supplierController = {
    // GET /suppliers - Hiển thị danh sách nhà cung cấp
    index: async (req, res) => {
        try {
            const suppliers = await Supplier.find().sort({ createdAt: -1 });
            res.render('suppliers/index', { 
                title: 'Danh sách nhà cung cấp',
                suppliers 
            });
        } catch (error) {
            req.flash('error', 'Có lỗi xảy ra khi tải danh sách nhà cung cấp');
            res.redirect('/');
        }
    },

    // GET /suppliers/new - Hiển thị form thêm nhà cung cấp
    new: (req, res) => {
        res.render('suppliers/new', { 
            title: 'Thêm nhà cung cấp mới',
            supplier: {} 
        });
    },

    // POST /suppliers - Tạo nhà cung cấp mới
    create: async (req, res) => {
        try {
            const supplier = new Supplier(req.body);
            await supplier.save();
            req.flash('success', 'Thêm nhà cung cấp thành công!');
            res.redirect('/suppliers');
        } catch (error) {
            req.flash('error', 'Có lỗi xảy ra: ' + error.message);
            res.render('suppliers/new', { 
                title: 'Thêm nhà cung cấp mới',
                supplier: req.body 
            });
        }
    },

    // GET /suppliers/:id - Hiển thị chi tiết nhà cung cấp
    show: async (req, res) => {
        try {
            const supplier = await Supplier.findById(req.params.id);
            if (!supplier) {
                req.flash('error', 'Không tìm thấy nhà cung cấp');
                return res.redirect('/suppliers');
            }

            // Lấy danh sách sản phẩm của nhà cung cấp này
            const products = await Product.find({ supplierId: supplier._id });

            res.render('suppliers/show', { 
                title: 'Chi tiết nhà cung cấp',
                supplier,
                products 
            });
        } catch (error) {
            req.flash('error', 'Có lỗi xảy ra khi tải thông tin nhà cung cấp');
            res.redirect('/suppliers');
        }
    },

    // GET /suppliers/:id/edit - Hiển thị form sửa nhà cung cấp
    edit: async (req, res) => {
        try {
            const supplier = await Supplier.findById(req.params.id);
            if (!supplier) {
                req.flash('error', 'Không tìm thấy nhà cung cấp');
                return res.redirect('/suppliers');
            }
            res.render('suppliers/edit', { 
                title: 'Sửa thông tin nhà cung cấp',
                supplier 
            });
        } catch (error) {
            req.flash('error', 'Có lỗi xảy ra khi tải thông tin nhà cung cấp');
            res.redirect('/suppliers');
        }
    },

    // PUT /suppliers/:id - Cập nhật nhà cung cấp
    update: async (req, res) => {
        try {
            const supplier = await Supplier.findByIdAndUpdate(
                req.params.id, 
                req.body, 
                { new: true, runValidators: true }
            );
            if (!supplier) {
                req.flash('error', 'Không tìm thấy nhà cung cấp');
                return res.redirect('/suppliers');
            }
            req.flash('success', 'Cập nhật nhà cung cấp thành công!');
            res.redirect('/suppliers/' + supplier._id);
        } catch (error) {
            req.flash('error', 'Có lỗi xảy ra: ' + error.message);
            const supplier = await Supplier.findById(req.params.id);
            res.render('suppliers/edit', { 
                title: 'Sửa thông tin nhà cung cấp',
                supplier: { ...supplier._doc, ...req.body }
            });
        }
    },

    // DELETE /suppliers/:id - Xóa nhà cung cấp
    destroy: async (req, res) => {
        try {
            // Kiểm tra xem có sản phẩm nào đang sử dụng nhà cung cấp này không
            const productsCount = await Product.countDocuments({ supplierId: req.params.id });
            if (productsCount > 0) {
                req.flash('error', `Không thể xóa nhà cung cấp này vì đang có ${productsCount} sản phẩm liên kết`);
                return res.redirect('/suppliers');
            }

            const supplier = await Supplier.findByIdAndDelete(req.params.id);
            if (!supplier) {
                req.flash('error', 'Không tìm thấy nhà cung cấp');
                return res.redirect('/suppliers');
            }
            req.flash('success', 'Xóa nhà cung cấp thành công!');
            res.redirect('/suppliers');
        } catch (error) {
            req.flash('error', 'Có lỗi xảy ra khi xóa nhà cung cấp');
            res.redirect('/suppliers');
        }
    }
};

module.exports = supplierController;