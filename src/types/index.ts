export interface User {
  _id: string
  name: string
  email: string
  role: 'user' | 'admin'
  createdAt: Date
}

export interface Product {
  _id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  createdAt: Date
  updatedAt: Date
}

export interface CartItem {
  _id: string
  product: Product
  quantity: number
}

export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface Order {
  _id: string
  userId: string
  items: OrderItem[]
  totalAmount: number
  status: 'pending' | 'paid' | 'shipped' | 'delivered'
  stripePaymentId: string
  createdAt: Date
}