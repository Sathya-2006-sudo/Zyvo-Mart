import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import dbConnect from '@/lib/mongodb'
import Product from '@/models/Product'
import Order from '@/models/Order'
import AdminSidebar from '@/components/AdminSidebar'
import Link from 'next/link'

export default async function AdminDashboard() {
  const session = await auth()
  if (!session || session.user.role !== 'admin') {
    redirect('/')
  }

  await dbConnect()
  const products = await Product.countDocuments()
  const orders = await Order.countDocuments()
  const revenue = await Order.aggregate([
    { $match: { status: 'paid' } },
    { $group: { _id: null, total: { $sum: '$totalAmount' } } },
  ])
  const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5)

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-gray-50 p-8">
        <h1 className="mb-8 text-3xl font-bold">Admin Dashboard</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
            <p className="mt-2 text-3xl font-bold text-primary">{products}</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
            <p className="mt-2 text-3xl font-bold text-primary">{orders}</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
            <p className="mt-2 text-3xl font-bold text-green-600">
              ${(revenue[0]?.total || 0).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm text-secondary hover:underline">
              View All
            </Link>
          </div>
          <div className="mt-4 overflow-hidden rounded-lg bg-white shadow-md">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order._id}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">{order._id.toString().slice(-8)}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">${order.totalAmount.toFixed(2)}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          order.status === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}