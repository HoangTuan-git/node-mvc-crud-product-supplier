const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tên nhà cung cấp là bắt buộc'],
        trim: true,
        maxlength: [100, 'Tên nhà cung cấp không được vượt quá 100 ký tự']
    },
    address: {
        type: String,
        required: [true, 'Địa chỉ là bắt buộc'],
        trim: true,
        maxlength: [200, 'Địa chỉ không được vượt quá 200 ký tự']
    },
    phone: {
        type: String,
        required: [true, 'Số điện thoại là bắt buộc'],
        trim: true,
        match: [/^[0-9]{10,11}$/, 'Số điện thoại phải có 10-11 chữ số']
    }
}, {
    timestamps: true
});

// Virtual for URL
supplierSchema.virtual('url').get(function() {
    return '/suppliers/' + this._id;
});

// Instance method to display formatted phone
supplierSchema.methods.getFormattedPhone = function() {
    if (this.phone.length === 10) {
        return this.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    } else if (this.phone.length === 11) {
        return this.phone.replace(/(\d{4})(\d{3})(\d{4})/, '$1-$2-$3');
    }
    return this.phone;
};

module.exports = mongoose.model('Supplier', supplierSchema);