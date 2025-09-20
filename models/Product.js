const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tên sản phẩm là bắt buộc'],
        trim: true,
        maxlength: [100, 'Tên sản phẩm không được vượt quá 100 ký tự']
    },
    price: {
        type: Number,
        required: [true, 'Giá sản phẩm là bắt buộc'],
        min: [0, 'Giá sản phẩm phải lớn hơn hoặc bằng 0']
    },
    quantity: {
        type: Number,
        required: [true, 'Số lượng sản phẩm là bắt buộc'],
        min: [0, 'Số lượng phải lớn hơn hoặc bằng 0'],
        validate: {
            validator: Number.isInteger,
            message: 'Số lượng phải là số nguyên'
        }
    },
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: [true, 'Nhà cung cấp là bắt buộc']
    }
}, {
    timestamps: true
});

// Virtual for URL
productSchema.virtual('url').get(function() {
    return '/products/' + this._id;
});

// Virtual for formatted price
productSchema.virtual('formattedPrice').get(function() {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(this.price);
});

// Virtual for total value
productSchema.virtual('totalValue').get(function() {
    return this.price * this.quantity;
});

// Virtual for formatted total value
productSchema.virtual('formattedTotalValue').get(function() {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(this.totalValue);
});

// Ensure virtual fields are serialised
productSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);