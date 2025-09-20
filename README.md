# Product and Supplier Management System

A CRUD web application built with Node.js, MongoDB, Mongoose following MVC architecture and Bootstrap for optimized user interface.

## 📋 Features

### Supplier Management
- ✅ View supplier list
- ✅ Add new suppliers
- ✅ View supplier details
- ✅ Edit supplier information
- ✅ Delete suppliers (with constraint checking)

### Product Management
- ✅ View product list
- ✅ Add new products
- ✅ View product details
- ✅ Edit product information
- ✅ Delete products

### Additional Features
- 📱 Responsive interface with Bootstrap 5
- 💸 Automatic total product value calculation
- 📊 Statistics and reporting
- 🔔 Inventory status notifications
- ✅ Input data validation
- 💾 Flash messages for feedback

## 🛠 Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose ODM
- **Template Engine**: EJS
- **Frontend**: Bootstrap 5, Bootstrap Icons
- **Architecture**: MVC (Model-View-Controller)

## 📊 Database Schema

### Supplier Model
### Supplier Model
```javascript
{
  name: String (required, max 100 chars),
  address: String (required, max 200 chars),
  phone: String (required, 10-11 digits),
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model
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

## 🚀 Installation and Setup

### System Requirements
- Node.js (version 14 or higher)
- MongoDB (running on localhost:27017)
- npm or yarn

### Step 1: Clone the project
```bash
cd node-mvc-crud-product-supplier
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Environment configuration
Create a `.env` file or use the existing one:
```
MONGO_URI=mongodb://localhost:27017/product_supplier_db
PORT=3000
SESSION_SECRET=your_secret_key_here
```

### Step 4: Initialize sample data (optional)
```bash
npm run seed
```

### Step 5: Run the application
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### Step 6: Access the application
Open your browser and visit: http://localhost:3000

## 📁 Project Structure

```
node-mvc-crud-product-supplier/
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

## 🎯 API Endpoints

### Suppliers
- `GET /suppliers` - Get supplier list
- `GET /suppliers/new` - Show add supplier form
- `POST /suppliers` - Create new supplier
- `GET /suppliers/:id` - Get supplier details
- `GET /suppliers/:id/edit` - Show edit supplier form
- `PUT /suppliers/:id` - Update supplier
- `DELETE /suppliers/:id` - Delete supplier

### Products
- `GET /products` - Get product list
- `GET /products/new` - Show add product form
- `POST /products` - Create new product
- `GET /products/:id` - Get product details
- `GET /products/:id/edit` - Show edit product form
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

## 🔍 Validation and Error Handling

### Validation Rules
- Supplier/Product name: Required, max 100 characters
- Address: Required, max 200 characters
- Phone number: Required, 10-11 digits
- Product price: Required, must be >= 0
- Quantity: Required, must be >= 0, integer value

### Error Handling
- 404: Page not found
- 500: Server error
- Flash messages for success/error notifications

## 💡 Key Features

1. **Responsive Design**: Optimized interface for all devices
2. **Real-time Calculation**: Automatic total product value calculation
3. **Smart Validation**: Data validation on both client and server side
4. **Stock Status**: Display inventory status (out of stock, low stock, in stock)
5. **Relationship Management**: Manage relationships between products and suppliers
6. **Safe Delete**: Constraint checking before deleting suppliers

## 🤝 Contributing

1. Fork the project
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Create a Pull Request

## 📝 License

This project is released under the MIT License. See the `LICENSE` file for more details.

## 👨‍💻 Author

Developed with ❤️ using Node.js, MongoDB and Bootstrap.