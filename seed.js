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

const products = [
  // Electronics (20) - Each with unique image
  { name: "Wireless Bluetooth Headphones", description: "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound quality", price: 149.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800", category: "Electronics", stock: 50 },
  { name: "Smart Fitness Watch", description: "Advanced fitness tracker with GPS, heart rate monitoring, sleep tracking, and smartphone notifications", price: 299.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800", category: "Electronics", stock: 30 },
  { name: "Wireless Gaming Mouse", description: "High-precision optical sensor with RGB lighting, programmable buttons, and ergonomic design", price: 69.99, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800", category: "Electronics", stock: 55 },
  { name: "Portable Bluetooth Speaker", description: "Waterproof portable speaker with powerful bass, 20-hour battery, and built-in microphone", price: 79.99, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800", category: "Electronics", stock: 40 },
  { name: "Smart LED TV 55 Inch", description: "4K Ultra HD Smart LED TV with HDR10+, built-in streaming apps, and voice control", price: 499.99, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800", category: "Electronics", stock: 15 },
  { name: "Mechanical Keyboard", description: "RGB mechanical gaming keyboard with Cherry MX switches, customizable backlighting, and media keys", price: 119.99, image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800", category: "Electronics", stock: 35 },
  { name: "Wireless Earbuds Pro", description: "True wireless earbuds with active noise cancellation, transparency mode, and spatial audio", price: 159.99, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800", category: "Electronics", stock: 60 },
  { name: "Laptop Stand Adjustable", description: "Ergonomic aluminum laptop stand with adjustable height and angle for better posture", price: 44.99, image: "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=800", category: "Electronics", stock: 70 },
  { name: "USB-C Hub 7-in-1", description: "Multi-port USB-C hub with HDMI output, SD card reader, and power delivery", price: 39.99, image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=800", category: "Electronics", stock: 80 },
  { name: "Webcam HD 1080p", description: "Full HD webcam with autofocus, built-in microphone, and automatic low-light correction", price: 59.99, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800", category: "Electronics", stock: 45 },
  { name: "Power Bank 20000mAh", description: "High-capacity portable charger with fast charging and dual USB output ports", price: 49.99, image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800", category: "Electronics", stock: 65 },
  { name: "Wireless Charger Pad", description: "Fast wireless charging pad compatible with all Qi-enabled devices", price: 24.99, image: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=800", category: "Electronics", stock: 90 },
  { name: "Smart Home Speaker", description: "Voice-controlled smart speaker with premium sound and smart home integration", price: 99.99, image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800", category: "Electronics", stock: 40 },
  { name: "Gaming Monitor 27 Inch", description: "144Hz gaming monitor with 1ms response time and AMD FreeSync support", price: 349.99, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800", category: "Electronics", stock: 20 },
  { name: "Tablet 10 Inch", description: "Android tablet with HD display, long battery life, and expandable storage", price: 199.99, image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800", category: "Electronics", stock: 30 },
  { name: "Smart Doorbell Camera", description: "WiFi doorbell camera with HD video, night vision, and two-way audio", price: 149.99, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", category: "Electronics", stock: 25 },
  { name: "External SSD 1TB", description: "Portable SSD with USB-C, shock-resistant design, and ultra-fast transfer speeds", price: 129.99, image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800", category: "Electronics", stock: 35 },
  { name: "Portable Projector", description: "Mini HD projector with built-in speakers and wireless connectivity", price: 179.99, image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800", category: "Electronics", stock: 25 },
  { name: "Smart Plug Set", description: "WiFi smart plugs pack of 4 with app control and voice assistant compatibility", price: 29.99, image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=800", category: "Electronics", stock: 60 },
  { name: "Drone Mini", description: "Compact drone with 4K camera, GPS, and 30-minute flight time", price: 249.99, image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800", category: "Electronics", stock: 20 },

  // Clothing (20) - Each with unique image
  { name: "Cotton T-Shirt Pack", description: "Set of 3 premium cotton t-shirts in assorted colors, breathable and comfortable", price: 39.99, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800", category: "Clothing", stock: 100 },
  { name: "Denim Jacket", description: "Classic denim jacket with vintage wash, perfect for casual styling", price: 89.99, image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800", category: "Clothing", stock: 25 },
  { name: "Leather Handbag", description: "Genuine leather handbag with multiple compartments and adjustable strap", price: 129.99, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800", category: "Clothing", stock: 35 },
  { name: "Winter Puffer Jacket", description: "Warm puffer jacket with water-resistant exterior and cozy fleece lining", price: 149.99, image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800", category: "Clothing", stock: 25 },
  { name: "Casual Sneakers", description: "Comfortable everyday sneakers with cushioned sole and breathable mesh upper", price: 79.99, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800", category: "Clothing", stock: 50 },
  { name: "Travel Backpack", description: "40L travel backpack with laptop compartment and anti-theft features", price: 69.99, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800", category: "Clothing", stock: 40 },
  { name: "Sunglasses Polarized", description: "Polarized sunglasses with UV400 protection and scratch-resistant lenses", price: 34.99, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800", category: "Clothing", stock: 80 },
  { name: "Running Shoes", description: "Lightweight running shoes with responsive cushioning and breathable mesh", price: 119.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800", category: "Clothing", stock: 45 },
  { name: "Wool Scarf", description: "Soft merino wool scarf in classic pattern, perfect for winter warmth", price: 29.99, image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800", category: "Clothing", stock: 60 },
  { name: "Baseball Cap", description: "Adjustable cotton cap with embroidered logo and breathable design", price: 19.99, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800", category: "Clothing", stock: 75 },
  { name: "Leather Belt", description: "Genuine leather belt with classic buckle, durable and stylish", price: 34.99, image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800", category: "Clothing", stock: 55 },
  { name: "Hoodie Pullover", description: "Cotton blend hoodie with kangaroo pocket and adjustable hood", price: 54.99, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800", category: "Clothing", stock: 65 },
  { name: "Dress Shirt", description: "Classic fit dress shirt with wrinkle-free fabric and button-down collar", price: 44.99, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800", category: "Clothing", stock: 40 },
  { name: "Jeans Slim Fit", description: "Modern slim fit jeans with stretch comfort and classic 5-pocket style", price: 59.99, image: "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=800", category: "Clothing", stock: 50 },
  { name: "Sports Socks Pack", description: "Set of 6 athletic socks with moisture-wicking and cushioned heel", price: 24.99, image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800", category: "Clothing", stock: 90 },
  { name: "Leather Gloves", description: "Touchscreen compatible leather gloves with warm lining", price: 39.99, image: "https://images.unsplash.com/photo-1531163816047-0e600b4e9f04?w=800", category: "Clothing", stock: 35 },
  { name: "Tank Top Pack", description: "Set of 3 tank tops in cotton, perfect for workout or casual wear", price: 29.99, image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800", category: "Clothing", stock: 70 },
  { name: "Formal Shoes", description: "Classic leather shoes with cushioned insole and durable sole", price: 99.99, image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800", category: "Clothing", stock: 30 },
  { name: "Swim Shorts", description: "Quick-dry swim shorts with elastic waistband and mesh lining", price: 34.99, image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800", category: "Clothing", stock: 55 },
  { name: "Winter Beanie", description: "Knitted beanie hat with soft fleece lining for extra warmth", price: 17.99, image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800", category: "Clothing", stock: 80 },

  // Home & Garden (20) - Each with unique image
  { name: "Indoor Plant Set", description: "Collection of 5 easy-care indoor plants in decorative pots", price: 49.99, image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800", category: "Home & Garden", stock: 40 },
  { name: "Coffee Maker Deluxe", description: "Programmable coffee maker with thermal carafe and brew strength control", price: 79.99, image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800", category: "Home & Garden", stock: 20 },
  { name: "Ceramic Plant Pot Set", description: "Set of 3 decorative ceramic pots with drainage holes and saucers", price: 32.99, image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800", category: "Home & Garden", stock: 45 },
  { name: "Kitchen Knife Set", description: "8-piece professional knife set with wooden block and sharpener", price: 89.99, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800", category: "Home & Garden", stock: 30 },
  { name: "Vintage Desk Lamp", description: "Adjustable LED desk lamp with touch control and USB charging port", price: 44.99, image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800", category: "Home & Garden", stock: 35 },
  { name: "Organic Green Tea Set", description: "Premium organic green tea collection with 50 biodegradable bags", price: 29.99, image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=800", category: "Home & Garden", stock: 70 },
  { name: "Standing Desk Mat", description: "Anti-fatigue standing desk mat with non-slip surface", price: 39.99, image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800", category: "Home & Garden", stock: 45 },
  { name: "Succulent Plant Set", description: "6 low-maintenance succulents in geometric planters", price: 27.99, image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=800", category: "Home & Garden", stock: 55 },
  { name: "Cast Iron Skillet", description: "Pre-seasoned 12-inch cast iron skillet, oven-safe and durable", price: 34.99, image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800", category: "Home & Garden", stock: 40 },
  { name: "Storage Basket Set", description: "Set of 3 woven storage baskets with handles in assorted sizes", price: 32.99, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800", category: "Home & Garden", stock: 50 },
  { name: "Throw Blanket", description: "Soft fleece throw blanket in geometric pattern, machine washable", price: 39.99, image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800", category: "Home & Garden", stock: 45 },
  { name: "Wall Clock Modern", description: "Modern silent wall clock with large numbers and minimalist design", price: 29.99, image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800", category: "Home & Garden", stock: 35 },
  { name: "Bathroom Towel Set", description: "Set of 6 premium cotton towels in coordinating colors", price: 49.99, image: "https://images.unsplash.com/photo-1616627561839-534b8e0e602e?w=800", category: "Home & Garden", stock: 40 },
  { name: "Cutting Board Set", description: "3 bamboo cutting boards with juice grooves and hang holes", price: 24.99, image: "https://images.unsplash.com/photo-1594226801341-41427b4e5c22?w=800", category: "Home & Garden", stock: 55 },
  { name: "Candle Set", description: "Set of 4 scented candles with natural soy wax and essential oils", price: 34.99, image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800", category: "Home & Garden", stock: 60 },
  { name: "Picture Frame Set", description: "Set of 5 wooden picture frames in assorted sizes with easel backs", price: 27.99, image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800", category: "Home & Garden", stock: 45 },
  { name: "Door Mat", description: "Durable coir door mat with welcome message and non-slip backing", price: 22.99, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", category: "Home & Garden", stock: 50 },
  { name: "Shower Curtain", description: "Waterproof shower curtain with weighted hem and easy installation", price: 19.99, image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800", category: "Home & Garden", stock: 55 },
  { name: "Pillow Set", description: "Set of 4 decorative throw pillows with removable covers", price: 44.99, image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800", category: "Home & Garden", stock: 40 },
  { name: "Flower Vase", description: "Elegant ceramic vase in modern design, perfect for fresh or dried flowers", price: 24.99, image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800", category: "Home & Garden", stock: 35 },

  // Sports (20) - Each with unique image
  { name: "Yoga Mat Pro", description: "Premium non-slip yoga mat with alignment lines and carrying strap", price: 34.99, image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800", category: "Sports", stock: 60 },
  { name: "Stainless Steel Water Bottle", description: "32oz insulated water bottle, keeps drinks cold for 24 hours", price: 24.99, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800", category: "Sports", stock: 80 },
  { name: "Fitness Resistance Bands", description: "Set of 5 resistance bands with different tension levels", price: 19.99, image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800", category: "Sports", stock: 100 },
  { name: "Yoga Towel", description: "Quick-dry microfiber yoga towel with corner pockets", price: 24.99, image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800", category: "Sports", stock: 65 },
  { name: "Dumbbell Set", description: "Adjustable dumbbell set from 5 to 52.5 lbs with space-saving design", price: 149.99, image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800", category: "Sports", stock: 25 },
  { name: "Jump Rope Speed", description: "Professional speed jump rope with ball bearings and adjustable length", price: 14.99, image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800", category: "Sports", stock: 75 },
  { name: "Foam Roller", description: "High-density foam roller for muscle recovery and myofascial release", price: 29.99, image: "https://images.unsplash.com/photo-1600881333168-2ef49b341f30?w=800", category: "Sports", stock: 50 },
  { name: "Gym Bag", description: "Durable gym bag with shoe compartment and wet pocket", price: 39.99, image: "https://images.unsplash.com/photo-1621221740014-a10c2961348c?w=800", category: "Sports", stock: 45 },
  { name: "Tennis Racket", description: "Professional tennis racket with carbon fiber frame and vibration dampening", price: 89.99, image: "https://images.unsplash.com/photo-1617083934555-563404543793?w=800", category: "Sports", stock: 30 },
  { name: "Basketball", description: "Official size basketball with superior grip and durability", price: 29.99, image: "https://images.unsplash.com/photo-1519861531473-92002639313cc?w=800", category: "Sports", stock: 40 },
  { name: "Soccer Ball", description: "Professional soccer ball with thermal bonded construction", price: 34.99, image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800", category: "Sports", stock: 35 },
  { name: "Golf Club Set", description: "10-piece golf club set with bag, perfect for beginners", price: 299.99, image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800", category: "Sports", stock: 15 },
  { name: "Cycling Helmet", description: "Adjustable cycling helmet with ventilation and MIPS technology", price: 44.99, image: "https://images.unsplash.com/photo-1507035895480-2b3156c31110?w=800", category: "Sports", stock: 40 },
  { name: "Swimming Goggles", description: "Anti-fog swimming goggles with UV protection and adjustable strap", price: 19.99, image: "https://images.unsplash.com/photo-1519315901367-f34f9150fa56?w=800", category: "Sports", stock: 55 },
  { name: "Pull Up Bar", description: "Doorway pull up bar with foam grips and no-screw installation", price: 34.99, image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800", category: "Sports", stock: 35 },
  { name: "Boxing Gloves", description: "Professional boxing gloves with wrist support and impact padding", price: 49.99, image: "https://images.unsplash.com/photo-1552074284-5e9a3d3ae1f0?w=800", category: "Sports", stock: 30 },
  { name: "Badminton Racket", description: "Carbon fiber badminton racket with tension up to 30lbs", price: 39.99, image: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=800", category: "Sports", stock: 40 },
  { name: "Skateboard Complete", description: "Professional skateboard with 8-inch deck and ABEC-7 bearings", price: 69.99, image: "https://images.unsplash.com/photo-1565992441121-4367c2967103?w=800", category: "Sports", stock: 25 },
  { name: "Hiking Backpack 40L", description: "Waterproof hiking backpack with rain cover and hydration compatibility", price: 79.99, image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800", category: "Sports", stock: 30 },
  { name: "Exercise Ball", description: "Yoga exercise ball with pump and anti-burst technology", price: 17.99, image: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=800", category: "Sports", stock: 60 },

  // Books (20) - Each with unique image
  { name: "Programming Cookbook", description: "Modern programming guide with 200+ practical recipes", price: 44.99, image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800", category: "Books", stock: 35 },
  { name: "Bestselling Novel Collection", description: "5 bestselling novels by award-winning authors", price: 59.99, image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800", category: "Books", stock: 50 },
  { name: "Cookbook Collection", description: "Essential recipes cookbook with 500 family favorites", price: 49.99, image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800", category: "Books", stock: 30 },
  { name: "Self Help Book", description: "Personal development book for achieving your goals", price: 19.99, image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800", category: "Books", stock: 65 },
  { name: "History Encyclopedia", description: "Comprehensive world history encyclopedia with illustrations", price: 69.99, image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800", category: "Books", stock: 25 },
  { name: "Science Fiction Box Set", description: "Classic sci-fi novels collection in deluxe edition", price: 54.99, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800", category: "Books", stock: 40 },
  { name: "Business Strategy Guide", description: "Business strategy book for modern entrepreneurs", price: 34.99, image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800", category: "Books", stock: 45 },
  { name: "Art Painting Book", description: "Learn to paint guide with step-by-step tutorials", price: 29.99, image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800", category: "Books", stock: 35 },
  { name: "Travel Photography Book", description: "Travel photography book with tips from professionals", price: 39.99, image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800", category: "Books", stock: 30 },
  { name: "Gardening Handbook", description: "Complete home gardening guide for beginners", price: 24.99, image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800", category: "Books", stock: 40 },
  { name: "Fitness Training Book", description: "Home workout guide with 100+ exercises", price: 22.99, image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800", category: "Books", stock: 50 },
  { name: "Psychology Textbook", description: "Introduction to psychology textbook for students", price: 79.99, image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800", category: "Books", stock: 20 },
  { name: "Children's Storybook Set", description: "10 bedtime stories for children ages 3-8", price: 29.99, image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800", category: "Books", stock: 55 },
  { name: "Biography Collection", description: "Biographies of famous leaders and innovators", price: 44.99, image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800", category: "Books", stock: 35 },
  { name: "Poetry Anthology", description: "Classic poetry collection from renowned poets", price: 19.99, image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800", category: "Books", stock: 40 },
  { name: "Mystery Novel Pack", description: "3 gripping mystery novels in one pack", price: 27.99, image: "https://images.unsplash.com/photo-1518744386442-2d48ac0a4908?w=800", category: "Books", stock: 45 },
  { name: "Science Encyclopedia", description: "Comprehensive science reference book with diagrams", price: 59.99, image: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=800", category: "Books", stock: 25 },
  { name: "Meditation Guide Book", description: "Meditation and mindfulness guide for inner peace", price: 17.99, image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800", category: "Books", stock: 50 },
  { name: "Finance Investment Book", description: "Personal finance guide for building wealth", price: 24.99, image: "https://images.unsplash.com/photo-1554224155-984d9bd4d9e5?w=800", category: "Books", stock: 40 },
  { name: "Craft DIY Book", description: "Creative DIY projects for all skill levels", price: 21.99, image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800", category: "Books", stock: 45 },
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
