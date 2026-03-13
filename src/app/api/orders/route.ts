import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Order from '@/models/Order'
import { auth } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()
    const { searchParams } = new URL(request.url)
    const userOnly = searchParams.get('userOnly')

    let orders
    if (session.user.role === 'admin' && !userOnly) {
      orders = await Order.find().sort({ createdAt: -1 })
    } else {
      orders = await Order.find({ userId: session.user.id }).sort({ createdAt: -1 })
    }

    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()
    const data = await request.json()
    const order = await Order.create({
      ...data,
      userId: session.user.id,
    })
    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}