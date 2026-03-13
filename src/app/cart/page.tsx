'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import CartItem from '@/components/CartItem'

export default function CartPage() {
  const { items, total, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-lg text-gray-500">Your cart is empty</p>
          <Link
            href="/products"
            className="mt-4 rounded-lg bg-secondary px-6 py-3 font-medium text-white hover:bg-blue-600"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem
              key={item.product._id}
              id={item.product._id}
              image={item.product.image}
              name={item.product.name}
              price={item.product.price}
              quantity={item.quantity}
            />
          ))}
        </div>
        <div className="rounded-lg bg-white p-6 shadow-md h-fit">
          <h2 className="text-xl font-bold">Order Summary</h2>
          <div className="mt-4 space-y-2 border-t pt-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">Free</span>
            </div>
            <div className="flex justify-between border-t pt-2 text-lg font-bold">
              <span>Total</span>
              <span className="text-secondary">${total.toFixed(2)}</span>
            </div>
          </div>
          <Link
            href="/checkout"
            className="mt-6 block w-full rounded-lg bg-secondary px-4 py-3 text-center font-medium text-white hover:bg-blue-600"
          >
            Proceed to Checkout
          </Link>
          <button
            onClick={clearCart}
            className="mt-3 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  )
}