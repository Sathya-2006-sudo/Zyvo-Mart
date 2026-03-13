import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import dbConnect from '@/lib/mongodb'
import Order from '@/models/Order'
import { auth } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()
    const { items, stripePaymentId } = await request.json()

    const totalAmount = items.reduce(
      (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
      0
    )

    const order = await Order.create({
      userId: session.user.id,
      items: items.map((item: { productId: string; name: string; price: number; quantity: number; image: string }) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      totalAmount,
      status: 'paid',
      stripePaymentId: stripePaymentId || '',
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}