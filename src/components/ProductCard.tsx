'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'
import { useCart } from '@/context/CartContext'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
      <Link href={`/products/${product._id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-1 text-xs font-medium text-white">
            {product.category}
          </span>
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/products/${product._id}`}>
          <h3 className="line-clamp-2 text-lg font-semibold text-gray-900 hover:text-secondary">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-gray-500">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-bold text-secondary">${product.price.toFixed(2)}</span>
        </div>
        <button
          onClick={() => addItem(product)}
          disabled={product.stock === 0}
          className="mt-3 w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}