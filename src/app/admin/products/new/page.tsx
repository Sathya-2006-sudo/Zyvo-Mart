import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/AdminSidebar'
import ProductForm from '@/components/ProductForm'

export default async function NewProductPage() {
  const session = await auth()
  if (!session || session.user.role !== 'admin') {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-gray-50 p-8">
        <h1 className="mb-8 text-3xl font-bold">Add New Product</h1>
        <div className="max-w-2xl">
          <ProductForm />
        </div>
      </main>
    </div>
  )
}