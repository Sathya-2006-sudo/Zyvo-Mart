import Image from 'next/image'
import { notFound } from 'next/navigation'
import AddToCartButton from '@/components/AddToCartButton'
import dbConnect from '@/lib/mongodb'
import Product from '@/models/Product'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params
  await dbConnect()
  const product = await Product.findById(id)

  if (!product) {
    notFound()
  }

  const productObj = product.toObject()

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={productObj.image}
            alt={productObj.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div>
          <span className="inline-block rounded-full bg-primary px-3 py-1 text-sm text-white">
            {productObj.category}
          </span>
          <h1 className="mt-4 text-3xl font-bold">{productObj.name}</h1>
          <p className="mt-2 text-2xl font-bold text-secondary">${productObj.price.toFixed(2)}</p>
          <p className="mt-4 text-gray-600">
            {productObj.stock > 0 ? `${productObj.stock} in stock` : 'Out of stock'}
          </p>
          <p className="mt-4 text-gray-600">{productObj.description}</p>
          <div className="mt-8">
            <AddToCartButton product={productObj} />
          </div>
        </div>
      </div>
    </div>
  )
}