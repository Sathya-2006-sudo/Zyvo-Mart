import mongoose, { Schema, Document } from 'mongoose'

export interface IOrder extends Document {
  userId: string
  items: {
    productId: string
    name: string
    price: number
    quantity: number
    image: string
  }[]
  totalAmount: number
  status: 'pending' | 'paid' | 'shipped' | 'delivered'
  stripePaymentId: string
  createdAt: Date
}

const orderSchema = new Schema<IOrder>({
  userId: {
    type: String,
    required: true,
  },
  items: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, required: true },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'shipped', 'delivered'],
    default: 'pending',
  },
  stripePaymentId: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema)