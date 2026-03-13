'use client'

import Image from 'next/image'
import { useCart } from '@/context/CartContext'

interface CartItemProps {
  id: string
  image: string
  name: string
  price: number
  quantity: number
}

export default function CartItem({ id, image, name, price, quantity }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col">
        <h3 className="font-medium text-gray-900">{name}</h3>
        <p className="mt-1 text-sm text-gray-500">${price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(id, quantity - 1)}
          className="rounded border p-1 hover:bg-gray-100"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <span className="w-8 text-center">{quantity}</span>
        <button
          onClick={() => updateQuantity(id, quantity + 1)}
          className="rounded border p-1 hover:bg-gray-100"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className="font-medium">${(price * quantity).toFixed(2)}</span>
        <button onClick={() => removeItem(id)} className="text-sm text-red-600 hover:text-red-800">
          Remove
        </button>
      </div>
    </div>
  )
}