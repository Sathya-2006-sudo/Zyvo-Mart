import { notFound } from 'next/navigation'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/AdminSidebar'
import ProductForm from '@/components/ProductForm'
import dbConnect from '@/lib/mongodb'
import Product from '@/models/Product'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: PageProps) {
  const session = await auth()
  if (!session || session.user.role !== 'admin') {
    redirect('/')
  }

  const { id } = await params
  await dbConnect()
  const product = await Product.findById(id)

  if (!product) {
    notFound()
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-gray-50 p-8">
        <h1 className="mb-8 text-3xl font-bold">Edit Product</h1>
        <div className="max-w-2xl">
          <ProductForm product={product.toObject()} />
        </div>
      </main>
    </div>
  )
}