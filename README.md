# Ứng dụng Quản lý Sản phẩm và Nhà cung cấp

Ứng dụng web CRUD được xây dựng với Node.js, MongoDB, Mongoose theo kiến trúc MVC và sử dụng Bootstrap để tối ưu giao diện.

## 📋 Tính năng

### Quản lý Nhà cung cấp
- ✅ Xem danh sách nhà cung cấp
- ✅ Thêm nhà cung cấp mới
- ✅ Xem chi tiết nhà cung cấp
- ✅ Chỉnh sửa thông tin nhà cung cấp
- ✅ Xóa nhà cung cấp (với kiểm tra ràng buộc)

### Quản lý Sản phẩm
- ✅ Xem danh sách sản phẩm
- ✅ Thêm sản phẩm mới
- ✅ Xem chi tiết sản phẩm
- ✅ Chỉnh sửa thông tin sản phẩm
- ✅ Xóa sản phẩm

### Tính năng bổ sung
- 📱 Giao diện responsive với Bootstrap 5
- 💸 Tính toán tự động tổng giá trị sản phẩm
- 📊 Thống kê và báo cáo
- 🔔 Thông báo trạng thái kho hàng
- ✅ Validate dữ liệu đầu vào
- 💾 Flash messages cho feedback

## 🛠 Công nghệ sử dụng

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose ODM
- **Template Engine**: EJS
- **Frontend**: Bootstrap 5, Bootstrap Icons
- **Kiến trúc**: MVC (Model-View-Controller)

## 📊 Cơ sở dữ liệu

### Model Supplier (Nhà cung cấp)
```javascript
{
  name: String (required, max 100 chars),
  address: String (required, max 200 chars),
  phone: String (required, 10-11 digits),
  createdAt: Date,
  updatedAt: Date
}
```

### Model Product (Sản phẩm)
```javascript
{
  name: String (required, max 100 chars),
  price: Number (required, min 0),
  quantity: Number (required, min 0, integer),
  supplierId: ObjectId (required, reference to Supplier),
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Cài đặt và chạy ứng dụng

### Yêu cầu hệ thống
- Node.js (version 14 trở lên)
- MongoDB (đang chạy tại localhost:27017)
- npm hoặc yarn

### Bước 1: Clone dự án
```bash
cd Phan1
```

### Bước 2: Cài đặt dependencies
```bash
npm install
```

### Bước 3: Cấu hình môi trường
Tạo file `.env` hoặc sử dụng file có sẵn:
```
MONGO_URI=mongodb://localhost:27017/product_supplier_db
PORT=3000
SESSION_SECRET=your_secret_key_here
```

### Bước 4: Khởi tạo dữ liệu mẫu (tùy chọn)
```bash
npm run seed
```

### Bước 5: Chạy ứng dụng
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### Bước 6: Truy cập ứng dụng
Mở trình duyệt và truy cập: http://localhost:3000

## 📁 Cấu trúc dự án

```
Phan1/
├── controllers/           # Controllers (MVC)
│   ├── supplierController.js
│   └── productController.js
├── models/               # Models (Mongoose schemas)
│   ├── Supplier.js
│   └── Product.js
├── routes/               # Route definitions
│   ├── supplierRoutes.js
│   └── productRoutes.js
├── views/                # EJS templates
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── suppliers/
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   ├── show.ejs
│   │   └── edit.ejs
│   ├── products/
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   ├── show.ejs
│   │   └── edit.ejs
│   ├── index.ejs
│   ├── 404.ejs
│   └── 500.ejs
├── public/               # Static files
│   └── css/
│       └── style.css
├── app.js               # Main application file
├── seed.js              # Database seeding script
├── package.json
├── .env                 # Environment variables
└── README.md
```

## 🎯 Endpoints API

### Nhà cung cấp
- `GET /suppliers` - Danh sách nhà cung cấp
- `GET /suppliers/new` - Form thêm nhà cung cấp
- `POST /suppliers` - Tạo nhà cung cấp mới
- `GET /suppliers/:id` - Chi tiết nhà cung cấp
- `GET /suppliers/:id/edit` - Form sửa nhà cung cấp
- `PUT /suppliers/:id` - Cập nhật nhà cung cấp
- `DELETE /suppliers/:id` - Xóa nhà cung cấp

### Sản phẩm
- `GET /products` - Danh sách sản phẩm
- `GET /products/new` - Form thêm sản phẩm
- `POST /products` - Tạo sản phẩm mới
- `GET /products/:id` - Chi tiết sản phẩm
- `GET /products/:id/edit` - Form sửa sản phẩm
- `PUT /products/:id` - Cập nhật sản phẩm
- `DELETE /products/:id` - Xóa sản phẩm

## 🔍 Validation và Error Handling

### Validation
- Tên nhà cung cấp/sản phẩm: Bắt buộc, tối đa 100 ký tự
- Địa chỉ: Bắt buộc, tối đa 200 ký tự
- Số điện thoại: Bắt buộc, 10-11 chữ số
- Giá sản phẩm: Bắt buộc, phải >= 0
- Số lượng: Bắt buộc, phải >= 0, số nguyên

### Error Handling
- 404: Trang không tìm thấy
- 500: Lỗi server
- Flash messages cho thông báo thành công/lỗi

## 💡 Tính năng nổi bật

1. **Responsive Design**: Giao diện tối ưu cho mọi thiết bị
2. **Real-time Calculation**: Tính toán tự động tổng giá trị sản phẩm
3. **Smart Validation**: Validate dữ liệu ở cả client và server
4. **Stock Status**: Hiển thị trạng thái kho hàng (hết hàng, sắp hết, còn hàng)
5. **Relationship Management**: Quản lý mối quan hệ giữa sản phẩm và nhà cung cấp
6. **Safe Delete**: Kiểm tra ràng buộc trước khi xóa nhà cung cấp

## 🤝 Đóng góp

1. Fork dự án
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit thay đổi (`git commit -m 'Add some AmazingFeature'`)
4. Push lên branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📝 License

Dự án này được phát hành dưới giấy phép MIT. Xem file `LICENSE` để biết thêm chi tiết.

## 👨‍💻 Tác giả

Được phát triển với ❤️ sử dụng Node.js, MongoDB và Bootstrap.