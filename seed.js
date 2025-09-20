const mongoose = require('mongoose');
const Supplier = require('./models/Supplier');
const Product = require('./models/Product');
require('dotenv').config();

// Database connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/product_supplier_db')
    .then(() => console.log('✅ Kết nối MongoDB thành công'))
    .catch(err => {
        console.error('❌ Lỗi kết nối MongoDB:', err);
        process.exit(1);
    });

// Sample data
const suppliersData = [
    {
        name: 'Công ty TNHH Điện tử ABC',
        address: '123 Đường Nguyễn Văn Cừ, Quận 5, TP.HCM',
        phone: '0901234567'
    },
    {
        name: 'Nhà phân phối XYZ',
        address: '456 Đường Lê Văn Việt, Quận 9, TP.HCM',
        phone: '0987654321'
    },
    {
        name: 'Công ty Cổ phần Công nghệ DEF',
        address: '789 Đường Trần Hưng Đạo, Quận 1, TP.HCM',
        phone: '0912345678'
    },
    {
        name: 'Siêu thị Điện máy GHI',
        address: '321 Đường Võ Văn Tần, Quận 3, TP.HCM',
        phone: '0976543210'
    },
    {
        name: 'Cửa hàng Thiết bị JKL',
        address: '654 Đường Phan Văn Trị, Gò Vấp, TP.HCM',
        phone: '0923456789'
    }
];

const productsData = [
    {
        name: 'Laptop Dell Inspiron 15',
        price: 15000000,
        quantity: 25
    },
    {
        name: 'iPhone 14 Pro Max',
        price: 29000000,
        quantity: 15
    },
    {
        name: 'Samsung Galaxy S23',
        price: 22000000,
        quantity: 30
    },
    {
        name: 'MacBook Air M2',
        price: 28000000,
        quantity: 10
    },
    {
        name: 'iPad Pro 11 inch',
        price: 20000000,
        quantity: 20
    },
    {
        name: 'Màn hình LG 27 inch',
        price: 5500000,
        quantity: 40
    },
    {
        name: 'Bàn phím cơ Logitech',
        price: 2200000,
        quantity: 60
    },
    {
        name: 'Chuột Gaming Razer',
        price: 1800000,
        quantity: 75
    },
    {
        name: 'Tai nghe Sony WH-1000XM4',
        price: 7500000,
        quantity: 35
    },
    {
        name: 'Ổ cứng SSD Samsung 1TB',
        price: 3200000,
        quantity: 50
    },
    {
        name: 'Camera Canon EOS R6',
        price: 45000000,
        quantity: 8
    },
    {
        name: 'Máy in HP LaserJet',
        price: 4500000,
        quantity: 18
    }
];

async function seedDatabase() {
    try {
        console.log('🗑️  Xóa dữ liệu cũ...');
        
        // Xóa dữ liệu cũ
        await Product.deleteMany({});
        await Supplier.deleteMany({});
        
        console.log('📝 Tạo dữ liệu nhà cung cấp...');
        
        // Tạo nhà cung cấp
        const suppliers = await Supplier.insertMany(suppliersData);
        console.log(`✅ Đã tạo ${suppliers.length} nhà cung cấp`);
        
        console.log('📦 Tạo dữ liệu sản phẩm...');
        
        // Tạo sản phẩm với nhà cung cấp ngẫu nhiên
        const products = [];
        for (const productData of productsData) {
            const randomSupplier = suppliers[Math.floor(Math.random() * suppliers.length)];
            products.push({
                ...productData,
                supplierId: randomSupplier._id
            });
        }
        
        const insertedProducts = await Product.insertMany(products);
        console.log(`✅ Đã tạo ${insertedProducts.length} sản phẩm`);
        
        console.log('\n📊 Thống kê dữ liệu đã tạo:');
        console.log(`   - Nhà cung cấp: ${suppliers.length}`);
        console.log(`   - Sản phẩm: ${insertedProducts.length}`);
        
        // Hiển thị thống kê chi tiết
        console.log('\n🏢 Danh sách nhà cung cấp:');
        suppliers.forEach((supplier, index) => {
            const supplierProducts = products.filter(p => p.supplierId.toString() === supplier._id.toString());
            console.log(`   ${index + 1}. ${supplier.name} (${supplierProducts.length} sản phẩm)`);
        });
        
        console.log('\n💰 Thống kê tổng quan:');
        const totalValue = insertedProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0);
        const totalQuantity = insertedProducts.reduce((sum, product) => sum + product.quantity, 0);
        
        console.log(`   - Tổng số lượng sản phẩm: ${totalQuantity.toLocaleString('vi-VN')}`);
        console.log(`   - Tổng giá trị kho hàng: ${totalValue.toLocaleString('vi-VN')} VNĐ`);
        
        console.log('\n🎉 Seeding hoàn thành! Bạn có thể khởi động ứng dụng bằng lệnh: npm start');
        
    } catch (error) {
        console.error('❌ Lỗi khi seed dữ liệu:', error);
    } finally {
        // Đóng kết nối database
        await mongoose.connection.close();
        console.log('🔌 Đã đóng kết nối database');
        process.exit(0);
    }
}

// Chạy seed function
seedDatabase();