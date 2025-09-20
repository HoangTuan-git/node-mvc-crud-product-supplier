const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

const productController = {
    // GET /products - Hiển thị danh sách sản phẩm
    index: async (req, res) => {
        try {
            const products = await Product.find()
                .populate('supplierId', 'name')
                .sort({ createdAt: -1 });
            res.render('products/index', { 
                title: 'Danh sách sản phẩm',
                products 
            });
        } catch (error) {
            req.flash('error', 'Có lỗi xảy ra khi tải danh sách sản phẩm');
            res.redirect('/');
        }
    },

    // GET /products/new - Hiển thị form thêm sản phẩm
    new: async (req, res) => {
        try {
            const suppliers = await Supplier.find().sort({ name: 1 });
            res.render('products/new', { 
                title: 'Thêm sản phẩm mới',
                product: {},
                suppliers 
            });
        } catch (error) {
            req.flash('error', 'Có lỗi xảy ra khi tải danh sách nhà cung cấp');
            res.redirect('/products');
        }
    },

    // POST /products - Tạo sản phẩm mới
    create: async (req, res) => {
        try {
            const product = new Product(req.body);
            await product.save();
            req.flash('success', 'Thêm sản phẩm thành công!');
            res.redirect('/products');
        } catch (error) {
            req.flash('error', 'Có lỗi xảy ra: ' + error.message);
            const suppliers = await Supplier.find().sort({ name: 1 });
            res.render('products/new', { 
                title: 'Thêm sản phẩm mới',
                product: req.body,
                suppliers 
            });
        }
    },

    // GET /products/:id - Hiển thị chi tiết sản phẩm
    show: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id)
                .populate('supplierId');
            if (!product) {
                req.flash('error', 'Không tìm thấy sản phẩm');
                return res.redirect('/products');
            }
            res.render('products/show', { 
                title: 'Chi tiết sản phẩm',
                product 
            });
        } catch (error) {
            req.flash('error', 'Có lỗi xảy ra khi tải thông tin sản phẩm');
            res.redirect('/products');
        }
    },

    // GET /products/:id/edit - Hiển thị form sửa sản phẩm
    edit: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            const suppliers = await Supplier.find().sort({ name: 1 });
            if (!product) {
                req.flash('error', 'Không tìm thấy sản phẩm');
                return res.redirect('/products');
            }
            res.render('products/edit', { 
                title: 'Sửa thông tin sản phẩm',
                product,
                suppliers 
            });
        } catch (error) {
            req.flash('error', 'Có lỗi xảy ra khi tải thông tin sản phẩm');
            res.redirect('/products');
        }
    },

    // PUT /products/:id - Cập nhật sản phẩm
    update: async (req, res) => {
        try {
            const product = await Product.findByIdAndUpdate(
                req.params.id, 
                req.body, 
                { new: true, runValidators: true }
            );
            if (!product) {
                req.flash('error', 'Không tìm thấy sản phẩm');
                return res.redirect('/products');
            }
            req.flash('success', 'Cập nhật sản phẩm thành công!');
            res.redirect('/products/' + product._id);
        } catch (error) {
            req.flash('error', 'Có lỗi xảy ra: ' + error.message);
            const product = await Product.findById(req.params.id);
            const suppliers = await Supplier.find().sort({ name: 1 });
            res.render('products/edit', { 
                title: 'Sửa thông tin sản phẩm',
                product: { ...product._doc, ...req.body },
                suppliers 
            });
        }
    },

    // DELETE /products/:id - Xóa sản phẩm
    destroy: async (req, res) => {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            if (!product) {
                req.flash('error', 'Không tìm thấy sản phẩm');
                return res.redirect('/products');
            }
            req.flash('success', 'Xóa sản phẩm thành công!');
            res.redirect('/products');
        } catch (error) {
            req.flash('error', 'Có lỗi xảy ra khi xóa sản phẩm');
            res.redirect('/products');
        }
    }
};

module.exports = productController;