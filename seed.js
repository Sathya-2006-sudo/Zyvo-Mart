const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
  createdAt: { type: Date, default: Date.now },
})

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  stock: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const User = mongoose.models.User || mongoose.model("User", userSchema)
const Product = mongoose.models.Product || mongoose.model("Product", productSchema)

const images = {
  Electronics: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800",
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800",
    "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800",
    "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800",
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800",
    "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=800",
    "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=800",
    "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800",
  ],
  Clothing: [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800",
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800",
    "https://images.unsplash.com/photo-1544923246-77307dd628b7?w=800",
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800",
    "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800",
  ],
  "Home & Garden": [
    "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800",
    "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800",
    "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800",
    "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800",
    "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800",
    "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800",
    "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=800",
    "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
    "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800",
  ],
  Sports: [
    "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800",
    "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800",
    "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800",
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
    "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800",
    "https://images.unsplash.com/photo-1600881333168-2ef49b341f30?w=800",
    "https://images.unsplash.com/photo-1617083934555-563404543793?w=800",
    "https://images.unsplash.com/photo-1519861531473-92002639313cc?w=800",
    "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800",
  ],
  Books: [
    "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800",
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800",
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800",
    "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800",
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800",
    "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800",
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
  ],
}

const products = [
  // Electronics (20)
  { name: "Wireless Bluetooth Headphones", description: "Premium over-ear headphones with noise cancellation", price: 149.99, image: images.Electronics[0], category: "Electronics", stock: 50 },
  { name: "Smart Fitness Watch", description: "Track your health with GPS and heart rate monitoring", price: 299.99, image: images.Electronics[1], category: "Electronics", stock: 30 },
  { name: "Wireless Gaming Mouse", description: "High-precision gaming mouse with RGB lighting", price: 69.99, image: images.Electronics[2], category: "Electronics", stock: 55 },
  { name: "Portable Bluetooth Speaker", description: "Waterproof speaker with 20-hour battery", price: 79.99, image: images.Electronics[3], category: "Electronics", stock: 40 },
  { name: "Smart LED TV 55 Inch", description: "4K Ultra HD Smart LED TV with HDR", price: 499.99, image: images.Electronics[4], category: "Electronics", stock: 15 },
  { name: "Mechanical Keyboard", description: "RGB mechanical gaming keyboard", price: 119.99, image: images.Electronics[5], category: "Electronics", stock: 35 },
  { name: "Wireless Earbuds Pro", description: "True wireless earbuds with ANC", price: 159.99, image: images.Electronics[6], category: "Electronics", stock: 60 },
  { name: "Laptop Stand Adjustable", description: "Ergonomic aluminum laptop stand", price: 44.99, image: images.Electronics[7], category: "Electronics", stock: 70 },
  { name: "USB-C Hub 7-in-1", description: "Multi-port USB-C hub with HDMI", price: 39.99, image: images.Electronics[8], category: "Electronics", stock: 80 },
  { name: "Webcam HD 1080p", description: "Full HD webcam with microphone", price: 59.99, image: images.Electronics[9], category: "Electronics", stock: 45 },
  { name: "Power Bank 20000mAh", description: "High-capacity portable charger", price: 49.99, image: images.Electronics[0], category: "Electronics", stock: 65 },
  { name: "Wireless Charger Pad", description: "Fast wireless charging pad", price: 24.99, image: images.Electronics[1], category: "Electronics", stock: 90 },
  { name: "Smart Home Speaker", description: "Voice-controlled smart speaker", price: 99.99, image: images.Electronics[2], category: "Electronics", stock: 40 },
  { name: "Gaming Monitor 27 Inch", description: "144Hz gaming monitor", price: 349.99, image: images.Electronics[3], category: "Electronics", stock: 20 },
  { name: "Tablet 10 Inch", description: "Android tablet with HD display", price: 199.99, image: images.Electronics[4], category: "Electronics", stock: 30 },
  { name: "Smart Doorbell Camera", description: "WiFi doorbell camera", price: 149.99, image: images.Electronics[5], category: "Electronics", stock: 25 },
  { name: "External SSD 1TB", description: "Portable SSD with USB-C", price: 129.99, image: images.Electronics[6], category: "Electronics", stock: 35 },
  { name: "Portable Projector", description: "Mini HD projector", price: 179.99, image: images.Electronics[7], category: "Electronics", stock: 25 },
  { name: "Smart Plug Set", description: "WiFi smart plugs pack of 4", price: 29.99, image: images.Electronics[8], category: "Electronics", stock: 60 },
  { name: "Drone Mini", description: "Compact drone with camera", price: 249.99, image: images.Electronics[9], category: "Electronics", stock: 20 },
  // Clothing (20)
  { name: "Cotton T-Shirt Pack", description: "Set of 3 premium cotton t-shirts", price: 39.99, image: images.Clothing[0], category: "Clothing", stock: 100 },
  { name: "Denim Jacket", description: "Classic denim jacket", price: 89.99, image: images.Clothing[1], category: "Clothing", stock: 25 },
  { name: "Leather Handbag", description: "Genuine leather handbag", price: 129.99, image: images.Clothing[2], category: "Clothing", stock: 35 },
  { name: "Winter Puffer Jacket", description: "Warm puffer jacket", price: 149.99, image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800", category: "Clothing", stock: 25 },
  { name: "Casual Sneakers", description: "Comfortable everyday sneakers", price: 79.99, image: images.Clothing[4], category: "Clothing", stock: 50 },
  { name: "Travel Backpack", description: "40L travel backpack", price: 69.99, image: images.Clothing[5], category: "Clothing", stock: 40 },
  { name: "Sunglasses Polarized", description: "Polarized sunglasses", price: 34.99, image: images.Clothing[6], category: "Clothing", stock: 80 },
  { name: "Running Shoes", description: "Lightweight running shoes", price: 119.99, image: images.Clothing[7], category: "Clothing", stock: 45 },
  { name: "Wool Scarf", description: "Soft merino wool scarf", price: 29.99, image: images.Clothing[8], category: "Clothing", stock: 60 },
  { name: "Baseball Cap", description: "Adjustable cotton cap", price: 19.99, image: images.Clothing[9], category: "Clothing", stock: 75 },
  { name: "Leather Belt", description: "Genuine leather belt", price: 34.99, image: images.Clothing[0], category: "Clothing", stock: 55 },
  { name: "Hoodie Pullover", description: "Cotton blend hoodie", price: 54.99, image: images.Clothing[1], category: "Clothing", stock: 65 },
  { name: "Dress Shirt", description: "Classic fit dress shirt", price: 44.99, image: images.Clothing[2], category: "Clothing", stock: 40 },
  { name: "Jeans Slim Fit", description: "Modern slim fit jeans", price: 59.99, image: "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=800", category: "Clothing", stock: 50 },
  { name: "Sports Socks Pack", description: "Set of 6 athletic socks", price: 24.99, image: images.Clothing[4], category: "Clothing", stock: 90 },
  { name: "Leather Gloves", description: "Touchscreen leather gloves", price: 39.99, image: images.Clothing[5], category: "Clothing", stock: 35 },
  { name: "Tank Top Pack", description: "Set of 3 tank tops", price: 29.99, image: images.Clothing[6], category: "Clothing", stock: 70 },
  { name: "Formal Shoes", description: "Classic leather shoes", price: 99.99, image: images.Clothing[7], category: "Clothing", stock: 30 },
  { name: "Swim Shorts", description: "Quick-dry swim shorts", price: 34.99, image: images.Clothing[8], category: "Clothing", stock: 55 },
  { name: "Winter Beanie", description: "Knitted beanie hat", price: 17.99, image: images.Clothing[9], category: "Clothing", stock: 80 },
  // Home & Garden (20)
  { name: "Indoor Plant Set", description: "Collection of 5 indoor plants", price: 49.99, image: images["Home & Garden"][0], category: "Home & Garden", stock: 40 },
  { name: "Coffee Maker Deluxe", description: "Programmable coffee maker", price: 79.99, image: images["Home & Garden"][1], category: "Home & Garden", stock: 20 },
  { name: "Ceramic Plant Pot Set", description: "Set of 3 ceramic pots", price: 32.99, image: images["Home & Garden"][2], category: "Home & Garden", stock: 45 },
  { name: "Kitchen Knife Set", description: "8-piece knife set", price: 89.99, image: images["Home & Garden"][3], category: "Home & Garden", stock: 30 },
  { name: "Vintage Desk Lamp", description: "Adjustable LED desk lamp", price: 44.99, image: images["Home & Garden"][4], category: "Home & Garden", stock: 35 },
  { name: "Organic Green Tea Set", description: "Organic green tea 50 bags", price: 29.99, image: images["Home & Garden"][5], category: "Home & Garden", stock: 70 },
  { name: "Standing Desk Mat", description: "Anti-fatigue desk mat", price: 39.99, image: images["Home & Garden"][6], category: "Home & Garden", stock: 45 },
  { name: "Succulent Plant Set", description: "6 low-maintenance succulents", price: 27.99, image: images["Home & Garden"][7], category: "Home & Garden", stock: 55 },
  { name: "Cast Iron Skillet", description: "Pre-seasoned 12-inch skillet", price: 34.99, image: images["Home & Garden"][8], category: "Home & Garden", stock: 40 },
  { name: "Storage Basket Set", description: "Set of 3 woven baskets", price: 32.99, image: images["Home & Garden"][9], category: "Home & Garden", stock: 50 },
  { name: "Throw Blanket", description: "Soft fleece throw blanket", price: 39.99, image: images["Home & Garden"][0], category: "Home & Garden", stock: 45 },
  { name: "Wall Clock Modern", description: "Silent wall clock", price: 29.99, image: images["Home & Garden"][1], category: "Home & Garden", stock: 35 },
  { name: "Bathroom Towel Set", description: "Set of 6 cotton towels", price: 49.99, image: images["Home & Garden"][2], category: "Home & Garden", stock: 40 },
  { name: "Cutting Board Set", description: "3 bamboo cutting boards", price: 24.99, image: images["Home & Garden"][3], category: "Home & Garden", stock: 55 },
  { name: "Candle Set", description: "Set of 4 scented candles", price: 34.99, image: images["Home & Garden"][4], category: "Home & Garden", stock: 60 },
  { name: "Picture Frame Set", description: "Set of 5 wooden frames", price: 27.99, image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800", category: "Home & Garden", stock: 45 },
  { name: "Door Mat", description: "Durable coir door mat", price: 22.99, image: images["Home & Garden"][6], category: "Home & Garden", stock: 50 },
  { name: "Shower Curtain", description: "Waterproof shower curtain", price: 19.99, image: images["Home & Garden"][7], category: "Home & Garden", stock: 55 },
  { name: "Pillow Set", description: "Set of 4 throw pillows", price: 44.99, image: images["Home & Garden"][8], category: "Home & Garden", stock: 40 },
  { name: "Flower Vase", description: "Elegant ceramic vase", price: 24.99, image: images["Home & Garden"][9], category: "Home & Garden", stock: 35 },
  // Sports (20)
  { name: "Yoga Mat Pro", description: "Premium non-slip yoga mat", price: 34.99, image: images.Sports[0], category: "Sports", stock: 60 },
  { name: "Stainless Steel Water Bottle", description: "32oz insulated bottle", price: 24.99, image: images.Sports[1], category: "Sports", stock: 80 },
  { name: "Fitness Resistance Bands", description: "Set of 5 resistance bands", price: 19.99, image: images.Sports[2], category: "Sports", stock: 100 },
  { name: "Yoga Towel", description: "Quick-dry microfiber towel", price: 24.99, image: images.Sports[3], category: "Sports", stock: 65 },
  { name: "Dumbbell Set", description: "Adjustable dumbbell set", price: 149.99, image: images.Sports[4], category: "Sports", stock: 25 },
  { name: "Jump Rope Speed", description: "Professional speed rope", price: 14.99, image: images.Sports[5], category: "Sports", stock: 75 },
  { name: "Foam Roller", description: "High-density foam roller", price: 29.99, image: images.Sports[6], category: "Sports", stock: 50 },
  { name: "Gym Bag", description: "Durable gym bag", price: 39.99, image: "https://images.unsplash.com/photo-1621221740014-a10c2961348c?w=800", category: "Sports", stock: 45 },
  { name: "Tennis Racket", description: "Professional tennis racket", price: 89.99, image: "https://images.unsplash.com/photo-1617083934555-563404543793?w=800", category: "Sports", stock: 30 },
  { name: "Basketball", description: "Official size basketball", price: 29.99, image: images.Sports[9], category: "Sports", stock: 40 },
  { name: "Soccer Ball", description: "Professional soccer ball", price: 34.99, image: images.Sports[0], category: "Sports", stock: 35 },
  { name: "Golf Club Set", description: "10-piece golf club set", price: 299.99, image: images.Sports[1], category: "Sports", stock: 15 },
  { name: "Cycling Helmet", description: "Adjustable cycling helmet", price: 44.99, image: images.Sports[2], category: "Sports", stock: 40 },
  { name: "Swimming Goggles", description: "Anti-fog swimming goggles", price: 19.99, image: images.Sports[3], category: "Sports", stock: 55 },
  { name: "Pull Up Bar", description: "Doorway pull up bar", price: 34.99, image: images.Sports[4], category: "Sports", stock: 35 },
  { name: "Boxing Gloves", description: "Professional boxing gloves", price: 49.99, image: images.Sports[5], category: "Sports", stock: 30 },
  { name: "Badminton Racket", description: "Carbon fiber racket", price: 39.99, image: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=800", category: "Sports", stock: 40 },
  { name: "Skateboard Complete", description: "Professional skateboard", price: 69.99, image: "https://images.unsplash.com/photo-1565992441121-4367c2967103?w=800", category: "Sports", stock: 25 },
  { name: "Hiking Backpack 40L", description: "Waterproof hiking backpack", price: 79.99, image: images.Sports[8], category: "Sports", stock: 30 },
  { name: "Exercise Ball", description: "Yoga exercise ball", price: 17.99, image: images.Sports[9], category: "Sports", stock: 60 },
  // Books (20)
  { name: "Programming Cookbook", description: "Modern programming guide", price: 44.99, image: images.Books[0], category: "Books", stock: 35 },
  { name: "Bestselling Novel Collection", description: "5 bestselling novels", price: 59.99, image: images.Books[1], category: "Books", stock: 50 },
  { name: "Cookbook Collection", description: "Essential recipes book", price: 49.99, image: images.Books[2], category: "Books", stock: 30 },
  { name: "Self Help Book", description: "Personal development book", price: 19.99, image: images.Books[3], category: "Books", stock: 65 },
  { name: "History Encyclopedia", description: "World history encyclopedia", price: 69.99, image: images.Books[4], category: "Books", stock: 25 },
  { name: "Science Fiction Box Set", description: "Classic sci-fi novels", price: 54.99, image: images.Books[5], category: "Books", stock: 40 },
  { name: "Business Strategy Guide", description: "Business strategy book", price: 34.99, image: images.Books[6], category: "Books", stock: 45 },
  { name: "Art Painting Book", description: "Learn to paint guide", price: 29.99, image: images.Books[7], category: "Books", stock: 35 },
  { name: "Travel Photography Book", description: "Travel photography book", price: 39.99, image: images.Books[8], category: "Books", stock: 30 },
  { name: "Gardening Handbook", description: "Home gardening guide", price: 24.99, image: images.Books[9], category: "Books", stock: 40 },
  { name: "Fitness Training Book", description: "Home workout guide", price: 22.99, image: images.Books[0], category: "Books", stock: 50 },
  { name: "Psychology Textbook", description: "Introduction to psychology", price: 79.99, image: images.Books[1], category: "Books", stock: 20 },
  { name: "Children's Storybook Set", description: "10 bedtime stories", price: 29.99, image: images.Books[2], category: "Books", stock: 55 },
  { name: "Biography Collection", description: "Biographies of leaders", price: 44.99, image: images.Books[3], category: "Books", stock: 35 },
  { name: "Poetry Anthology", description: "Classic poetry collection", price: 19.99, image: images.Books[4], category: "Books", stock: 40 },
  { name: "Mystery Novel Pack", description: "3 mystery novels", price: 27.99, image: images.Books[5], category: "Books", stock: 45 },
  { name: "Science Encyclopedia", description: "Science reference book", price: 59.99, image: images.Books[6], category: "Books", stock: 25 },
  { name: "Meditation Guide Book", description: "Meditation and mindfulness", price: 17.99, image: images.Books[7], category: "Books", stock: 50 },
  { name: "Finance Investment Book", description: "Personal finance guide", price: 24.99, image: images.Books[8], category: "Books", stock: 40 },
  { name: "Craft DIY Book", description: "Creative DIY projects", price: 21.99, image: images.Books[9], category: "Books", stock: 45 },
]

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/zuvomart")
    console.log("✅ Connected to MongoDB")

    const adminExists = await User.findOne({ email: "admin@zuvomart.com" })
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 12)
      await User.create({ name: "Admin", email: "admin@zuvomart.com", password: hashedPassword, role: "admin" })
      console.log("✅ Admin created (admin@zuvomart.com / admin123)")
    }

    await Product.deleteMany({})
    await Product.insertMany(products)
    console.log(`✅ ${products.length} products inserted`)

    console.log("🎉 Seed completed!")
    process.exit()
  } catch (error) {
    console.error("❌ Seed Error:", error)
    process.exit(1)
  }
}

seed()
