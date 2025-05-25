const Navigation = require('../constants/navigation')
const Product = require('../models/Product');
const STATUS_CODE = require('../constants/statusCode');

const getProductsView = (req, res) => {
    const products = Product.getAll();
    res.render('products', { products, headTitle: 'Products List' });
};

const getAddProductView = (req, res) => {
    res.render('add-product', {
        headTitle: 'Add Product', menuLinks: Navigation.MENU_LINKS, activeLinkPath: '/products/add'
    });
};

const addNewProduct = (req, res) => {
    const { name, description } = req.body;
    if (name && description) {
        const newProduct = new Product(name, description);
        Product.add(newProduct);
        res.redirect('/products/new');
    } else {
        res.status(STATUS_CODE.BAD_REQUEST).send('Name and description required');
    }
};

const getNewProductView = (req, res) => {
    const product = Product.getLast();
    res.render('new-product', { newestProduct: product, headTitle: 'New Product', menuLinks: Navigation.MENU_LINKS, activeLinkPath: '/products/new' });
};

const getProductView = (req, res) => {
    const { name } = req.params;
    const product = Product.findByName(name);
    if (product) {
        res.render('product', { product });
    } else {
        res.status(STATUS_CODE.NOT_FOUND).send('Product not found');
    }
};

const deleteProduct = (req, res) => {
    const { name } = req.params;
    const deleted = Product.deleteByName(name);
    if (deleted) {
        res.status(STATUS_CODE.OK).json({ success: true });
    } else {
        res.status(STATUS_CODE.NOT_FOUND).json({ success: false, message: 'Product not found' });
    }
};

module.exports = {
    getProductsView,
    getAddProductView,
    addNewProduct,
    getNewProductView,
    getProductView,
    deleteProduct,
};
