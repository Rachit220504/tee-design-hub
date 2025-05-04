const { Product, Category } = require('../models');
const path = require('path');
const fs = require('fs');

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search, sort, featured } = req.query;
    const offset = (page - 1) * limit;
    
    // Build where clause
    let where = {};
    
    // Filter by category if provided
    if (category) {
      const categoryRecord = await Category.findOne({
        where: { name: category }
      });
      
      if (categoryRecord) {
        where.CategoryId = categoryRecord.id;
      }
    }
    
    // Filter by search term if provided
    if (search) {
      where = {
        ...where,
        [Op.or]: [
          { title: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } }
        ]
      };
    }
    
    // Filter by featured if provided
    if (featured === 'true') {
      where.featured = true;
    }
    
    // Determine sort order
    let order = [];
    if (sort) {
      const [field, direction] = sort.split(':');
      
      if (field && (direction === 'asc' || direction === 'desc')) {
        order.push([field, direction.toUpperCase()]);
      }
    } else {
      // Default sort order
      order.push(['createdAt', 'DESC']);
    }
    
    // Get products with pagination
    const { count, rows: products } = await Product.findAndCountAll({
      where,
      order,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [{ model: Category, attributes: ['id', 'name'] }]
    });
    
    // Calculate total pages
    const totalPages = Math.ceil(count / limit);
    
    res.status(200).json({
      success: true,
      count,
      totalPages,
      currentPage: parseInt(page),
      products
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get featured products
exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        featured: true
      },
      limit: 6,
      include: [{ model: Category, attributes: ['id', 'name'] }]
    });
    
    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    console.error('Get featured products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get single product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category, attributes: ['id', 'name'] }]
    });
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Create new product
exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, size, color, stockQuantity, categoryId, featured } = req.body;
    
    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image'
      });
    }
    
    // Create product
    const product = await Product.create({
      title,
      description,
      price,
      imgSrc: `/uploads/${req.file.filename}`,
      size,
      color,
      stockQuantity,
      CategoryId: categoryId,
      featured: featured || false
    });
    
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Create product error:', error);
    
    // Remove uploaded file if there's an error
    if (req.file) {
      fs.unlink(path.join(__dirname, '..', 'uploads', req.file.filename), err => {
        if (err) console.error('File deletion error:', err);
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { title, description, price, size, color, stockQuantity, categoryId, featured } = req.body;
    
    // Find product
    const product = await Product.findByPk(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Update product fields
    if (title) product.title = title;
    if (description) product.description = description;
    if (price) product.price = price;
    if (size) product.size = size;
    if (color) product.color = color;
    if (stockQuantity !== undefined) product.stockQuantity = stockQuantity;
    if (categoryId) product.CategoryId = categoryId;
    if (featured !== undefined) product.featured = featured;
    
    // Update image if uploaded
    if (req.file) {
      // Remove old image
      const oldImagePath = path.join(__dirname, '..', product.imgSrc);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      
      // Set new image path
      product.imgSrc = `/uploads/${req.file.filename}`;
    }
    
    // Save updated product
    await product.save();
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Update product error:', error);
    
    // Remove uploaded file if there's an error
    if (req.file) {
      fs.unlink(path.join(__dirname, '..', 'uploads', req.file.filename), err => {
        if (err) console.error('File deletion error:', err);
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    // Find product
    const product = await Product.findByPk(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Remove image file
    const imagePath = path.join(__dirname, '..', product.imgSrc);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
    
    // Delete product from database
    await product.destroy();
    
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
