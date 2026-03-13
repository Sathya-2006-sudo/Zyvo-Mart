import Link from 'next/link'
import Image from 'next/image'
import AdminSidebar from '@/components/AdminSidebar'
import dbConnect from '@/lib/mongodb'
import Product from '@/models/Product'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function AdminProductsPage() {
  const session = await auth()
  if (!session || session.user.role !== 'admin') {
    redirect('/')
  }

  await dbConnect()
  const products = await Product.find().sort({ createdAt: -1 })

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-gray-50 p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Products</h1>
          <Link
            href="/admin/products/new"
            className="rounded-lg bg-secondary px-4 py-2 font-medium text-white hover:bg-blue-600"
          >
            Add Product
          </Link>
        </div>
        <div className="mt-8 overflow-hidden rounded-lg bg-white shadow-md">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded">
                      <Image src={product.image} alt={product.name} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{product.category}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{product.stock}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/products/${product._id}/edit`}
                        className="rounded border border-gray-300 px-2 py-1 text-xs hover:bg-gray-100"
                      >
                        Edit
                      </Link>
                      <DeleteButton id={product._id.toString()} />
                    </div>
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

function DeleteButton({ id }: { id: string }) {
  return (
    <form
      action={async () => {
        'use server'
        await dbConnect()
        await Product.findByIdAndDelete(id)
      }}
    >
      <button
        type="submit"
        className="rounded border border-red-300 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
      >
        Delete
      </button>
    </form>
  )
}