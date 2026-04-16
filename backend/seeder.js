require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./backend/models/Product');
const User = require('./backend/models/User');
const Coupon = require('./backend/models/Coupon');

const sampleProducts = [
  {
    name: 'Apple iPhone 15 Pro Max 256GB',
    description: 'The most powerful iPhone ever with A17 Pro chip, titanium design, and incredible camera system with 5x optical zoom.',
    price: 159900, discountPrice: 154900,
    category: 'Electronics', brand: 'Apple', stock: 50, featured: true,
    rating: 4.8, numReviews: 1250,
    images: [{ public_id: 'iphone15', url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80' }],
    tags: ['smartphone', 'apple', '5g'],
  },
  {
    name: 'Samsung Galaxy S24 Ultra 512GB',
    description: 'Galaxy AI is here. The Galaxy S24 Ultra with built-in S Pen, 200MP camera, and Snapdragon 8 Gen 3.',
    price: 134999, discountPrice: 129999,
    category: 'Electronics', brand: 'Samsung', stock: 35, featured: true,
    rating: 4.7, numReviews: 890,
    images: [{ public_id: 'samsung_s24', url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&q=80' }],
    tags: ['smartphone', 'samsung', '5g'],
  },
  {
    name: 'Sony WH-1000XM5 Wireless Headphones',
    description: 'Industry-leading noise canceling with Auto NC Optimizer, exceptional sound quality with HD noise canceling processor.',
    price: 29990, discountPrice: 24990,
    category: 'Electronics', brand: 'Sony', stock: 80,
    rating: 4.9, numReviews: 2100,
    images: [{ public_id: 'sony_wh', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' }],
    tags: ['headphones', 'wireless', 'noise-canceling'],
  },
  {
    name: 'MacBook Pro 14" M3 Pro',
    description: 'MacBook Pro supercharged by M3 Pro chip. Latest generation of Apple silicon for professionals.',
    price: 199900, discountPrice: 189900,
    category: 'Electronics', brand: 'Apple', stock: 25, featured: true,
    rating: 4.9, numReviews: 560,
    images: [{ public_id: 'macbook_m3', url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80' }],
    tags: ['laptop', 'apple', 'professional'],
  },
  {
    name: 'Nike Air Max 270 Sneakers',
    description: 'The Nike Air Max 270 delivers a fresh look with its large Air unit in the heel for all-day comfort.',
    price: 12995, discountPrice: 9995,
    category: 'Fashion', brand: 'Nike', stock: 120,
    rating: 4.5, numReviews: 3400,
    images: [{ public_id: 'nike_airmax', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' }],
    tags: ['shoes', 'nike', 'sports'],
  },
  {
    name: 'Levi\'s 511 Slim Fit Jeans',
    description: 'Classic slim-fit jeans with a modern touch. Made with stretch denim for comfort and style.',
    price: 4499, discountPrice: 2999,
    category: 'Fashion', brand: 'Levi\'s', stock: 200,
    rating: 4.3, numReviews: 5600,
    images: [{ public_id: 'levis_jeans', url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80' }],
    tags: ['jeans', 'denim', 'casual'],
  },
  {
    name: 'Dyson V15 Detect Vacuum Cleaner',
    description: 'Reveals microscopic dust you cannot see. Laser illuminates dust on floors. Piezo sensor counts and sizes every particle.',
    price: 52900, discountPrice: 44900,
    category: 'Home & Kitchen', brand: 'Dyson', stock: 30, featured: true,
    rating: 4.7, numReviews: 780,
    images: [{ public_id: 'dyson_v15', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80' }],
    tags: ['vacuum', 'cleaning', 'home'],
  },
  {
    name: 'Instant Pot Duo 7-in-1',
    description: '7-in-1 multi-use programmable pressure cooker, slow cooker, rice cooker, steamer, sauté, yogurt maker and warmer.',
    price: 8999, discountPrice: 6499,
    category: 'Home & Kitchen', brand: 'Instant Pot', stock: 75,
    rating: 4.6, numReviews: 12000,
    images: [{ public_id: 'instant_pot', url: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&q=80' }],
    tags: ['kitchen', 'cooking', 'pressure-cooker'],
  },
  {
    name: 'The Alchemist - Paulo Coelho',
    description: 'A novel about a young Andalusian shepherd who yearns to travel in search of a worldly treasure as extravagant as any ever found.',
    price: 350, discountPrice: 249,
    category: 'Books', brand: 'HarperCollins', stock: 500,
    rating: 4.8, numReviews: 89000,
    images: [{ public_id: 'alchemist', url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&q=80' }],
    tags: ['fiction', 'bestseller', 'novel'],
  },
  {
    name: 'Atomic Habits - James Clear',
    description: 'No matter your goals, Atomic Habits offers a proven framework for improving every day. James Clear reveals strategies for forming good habits.',
    price: 599, discountPrice: 399,
    category: 'Books', brand: 'Penguin', stock: 350,
    rating: 4.9, numReviews: 45000,
    images: [{ public_id: 'atomic_habits', url: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&q=80' }],
    tags: ['self-help', 'habits', 'productivity'],
  },
  {
    name: 'Adidas Ultraboost 23 Running Shoes',
    description: 'Made in part with materials from suppliers who follow strict social & environmental standards. Continental rubber gives you superior grip.',
    price: 17999, discountPrice: 13999,
    category: 'Sports', brand: 'Adidas', stock: 90,
    rating: 4.6, numReviews: 2300,
    images: [{ public_id: 'adidas_ultraboost', url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80' }],
    tags: ['shoes', 'running', 'sports'],
  },
  {
    name: 'Yoga Mat Premium Non-Slip',
    description: 'Extra thick 6mm yoga mat with alignment lines, non-slip surface, and moisture-wicking cover. Perfect for all yoga styles.',
    price: 2499, discountPrice: 1799,
    category: 'Sports', brand: 'Manduka', stock: 150,
    rating: 4.5, numReviews: 4500,
    images: [{ public_id: 'yoga_mat', url: 'https://images.unsplash.com/photo-1601925228008-4a2715b5e2b9?w=500&q=80' }],
    tags: ['yoga', 'fitness', 'exercise'],
  },
  {
    name: 'L\'Oréal Revitalift Face Serum',
    description: 'Anti-aging face serum with 2.5% pure retinol that visibly reduces wrinkles and firms skin in just 4 weeks.',
    price: 1299, discountPrice: 899,
    category: 'Beauty', brand: 'L\'Oréal', stock: 200,
    rating: 4.4, numReviews: 8900,
    images: [{ public_id: 'loreal_serum', url: 'https://images.unsplash.com/photo-1570194065650-d99fb4a38928?w=500&q=80' }],
    tags: ['skincare', 'serum', 'anti-aging'],
  },
  {
    name: 'iPad Pro 12.9" M2 Wi-Fi 256GB',
    description: 'iPad Pro with M2 chip for extreme performance, the stunning Liquid Retina XDR display, and accessories for the ultimate experience.',
    price: 112900, discountPrice: 107900,
    category: 'Electronics', brand: 'Apple', stock: 40, featured: true,
    rating: 4.8, numReviews: 1800,
    images: [{ public_id: 'ipad_pro', url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80' }],
    tags: ['tablet', 'apple', 'ipad'],
  },
  {
    name: 'boAt Airdopes 141 TWS Earbuds',
    description: 'True wireless earbuds with 42H playtime, IPX4 water resistance, and BEAST mode for low latency gaming.',
    price: 1499, discountPrice: 999,
    category: 'Electronics', brand: 'boAt', stock: 500,
    rating: 4.2, numReviews: 25000,
    images: [{ public_id: 'boat_earbuds', url: 'https://images.unsplash.com/photo-1590658268037-6bf12165cd8b?w=500&q=80' }],
    tags: ['earbuds', 'wireless', 'tws'],
  },
  {
    name: 'LEGO Technic Bugatti Bolide',
    description: 'Build the ultimate LEGO Technic supercar - the Bugatti Bolide! Features a V16 engine with moving pistons.',
    price: 24999, discountPrice: 19999,
    category: 'Toys', brand: 'LEGO', stock: 60,
    rating: 4.9, numReviews: 1200,
    images: [{ public_id: 'lego_bugatti', url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500&q=80' }],
    tags: ['lego', 'toys', 'building'],
  },
  {
    name: 'Organic Quinoa 1kg',
    description: 'Premium organic white quinoa, complete protein source with all 9 essential amino acids. Gluten-free, non-GMO.',
    price: 599, discountPrice: 449,
    category: 'Grocery', brand: 'True Elements', stock: 300,
    rating: 4.5, numReviews: 6700,
    images: [{ public_id: 'quinoa', url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80' }],
    tags: ['organic', 'healthy', 'grain'],
  },
  {
    name: 'Samsung 65" 4K QLED Smart TV',
    description: '4K QLED TV with Quantum Dot technology, 120Hz refresh rate, Dolby Atmos, and built-in Alexa and Google Assistant.',
    price: 129990, discountPrice: 99990,
    category: 'Electronics', brand: 'Samsung', stock: 20, featured: true,
    rating: 4.7, numReviews: 3400,
    images: [{ public_id: 'samsung_tv', url: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&q=80' }],
    tags: ['tv', 'smart-tv', '4k'],
  },
  {
    name: 'Ray-Ban Wayfarer Classic Sunglasses',
    description: 'The Wayfarer is the most recognized style in the history of sunglasses, with its unique trapezoidal frame shape.',
    price: 7490, discountPrice: 5990,
    category: 'Fashion', brand: 'Ray-Ban', stock: 100,
    rating: 4.6, numReviews: 9800,
    images: [{ public_id: 'rayban', url: 'https://images.unsplash.com/photo-1473496169904-658ba7574b0d?w=500&q=80' }],
    tags: ['sunglasses', 'fashion', 'eyewear'],
  },
  {
    name: 'Nescafé Classic Instant Coffee 200g',
    description: 'Nescafé Classic is made from selected dark and light roasted coffee beans for a perfectly balanced taste.',
    price: 399, discountPrice: 329,
    category: 'Grocery', brand: 'Nescafé', stock: 1000,
    rating: 4.4, numReviews: 32000,
    images: [{ public_id: 'nescafe', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80' }],
    tags: ['coffee', 'instant', 'beverage'],
  },
];

const sampleCoupons = [
  { code: 'WELCOME10', discountPercent: 10, minOrderAmount: 500, maxUses: 1000, expiresAt: new Date('2027-12-31') },
  { code: 'SAVE20', discountPercent: 20, minOrderAmount: 2000, maxUses: 500, expiresAt: new Date('2027-12-31') },
  { code: 'FLAT50', discountPercent: 50, minOrderAmount: 5000, maxUses: 100, expiresAt: new Date('2027-06-30') },
  { code: 'NEWUSER15', discountPercent: 15, minOrderAmount: 1000, maxUses: 200, expiresAt: new Date('2027-12-31') },
];

const seedData = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('📦 Connected to MongoDB for seeding...');

  if (process.argv[2] === '-d') {
    await Product.deleteMany();
    await User.deleteMany();
    await Coupon.deleteMany();
    console.log('🗑️  All data destroyed');
    process.exit(0);
  }

  await Product.deleteMany();
  await Coupon.deleteMany();

  // Create admin user
  const adminExists = await User.findOne({ email: 'admin@shopnow.com' });
  if (!adminExists) {
    await User.create({
      name: 'Admin User',
      email: 'admin@shopnow.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log('👤 Admin created: admin@shopnow.com / admin123');
  }

  // Create test user
  const userExists = await User.findOne({ email: 'user@shopnow.com' });
  if (!userExists) {
    await User.create({
      name: 'Test User',
      email: 'user@shopnow.com',
      password: 'user1234',
      role: 'user',
    });
    console.log('👤 Test user created: user@shopnow.com / user1234');
  }

  await Product.insertMany(sampleProducts);
  await Coupon.insertMany(sampleCoupons);

  console.log(`✅ Seeded ${sampleProducts.length} products`);
  console.log(`✅ Seeded ${sampleCoupons.length} coupons`);
  console.log('\n🎉 Database seeded successfully!\n');
  process.exit(0);
};

seedData().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
