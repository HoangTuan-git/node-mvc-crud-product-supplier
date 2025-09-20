const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const flash = require('express-flash');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const app = express();

// Import routes
const supplierRoutes = require('./routes/supplierRoutes');
const productRoutes = require('./routes/productRoutes');

// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Kết nối MongoDB thành công'))
    .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static('public'));

// Global variables
app.use((req, res, next) => {
    res.locals.successMessage = req.flash('success');
    res.locals.errorMessage = req.flash('error');
    next();
});

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Trang chủ' });
});

app.use('/suppliers', supplierRoutes);
app.use('/products', productRoutes);

// Error handling middleware
app.use((req, res, next) => {
    res.status(404).render('404', { title: 'Không tìm thấy trang' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500', { title: 'Lỗi hệ thống' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});