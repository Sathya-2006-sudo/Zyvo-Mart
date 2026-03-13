import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/AdminSidebar'
import dbConnect from '@/lib/mongodb'
import Order, { IOrder } from '@/models/Order'
import UpdateOrderStatus from '@/components/UpdateOrderStatus'

export default async function AdminOrdersPage() {
  const session = await auth()
  if (!session || session.user.role !== 'admin') {
    redirect('/')
  }

  await dbConnect()
  const orders: IOrder[] = await Order.find().sort({ createdAt: -1 }).lean()

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-gray-50 p-8">
        <h1 className="mb-8 text-3xl font-bold">Orders</h1>
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id.toString()}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-mono">
                    {order._id.toString().slice(-8)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">{order.userId}</td>
                  <td className="px-6 py-4 text-sm">
                    {(order.items as Array<{ name: string; quantity: number }>).map((item, i) => (
                      <div key={i}>
                        {item.name} x {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        order.status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : order.status === 'shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <UpdateOrderStatus orderId={order._id.toString()} currentStatus={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}