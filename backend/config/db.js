const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Create indexes for performance
    const db = conn.connection.db;
    await db.collection('products').createIndex({ category: 1 });
    await db.collection('products').createIndex({ price: 1 });
    await db.collection('products').createIndex({ rating: -1 });
    await db.collection('products').createIndex({ name: 'text', description: 'text' });
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
