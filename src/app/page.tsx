import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import dbConnect from '@/lib/mongodb'
import Product from '@/models/Product'

export default async function HomePage() {
  await dbConnect()
  const products = await Product.find().limit(8).sort({ createdAt: -1 })

  return (
    <div>
      <section className="bg-gradient-to-r from-primary to-gray-800 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">Welcome to ZyvoMart</h1>
          <p className="mt-4 text-xl text-gray-200">Discover quality products at amazing prices</p>
          <Link
            href="/products"
            className="mt-6 inline-block rounded-lg bg-accent px-6 py-3 font-medium text-primary hover:bg-amber-400"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-2xl font-bold">Featured Products</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id.toString()} product={product.toObject()} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="inline-block rounded-lg border border-secondary px-6 py-3 font-medium text-secondary hover:bg-secondary hover:text-white"
          >
            View All Products
          </Link>
        </div>
      </section>
    </div>
  )
}