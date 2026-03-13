'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ProductFormProps {
  product?: {
    _id: string
    name: string
    description: string
    price: number
    image: string
    category: string
    stock: number
  }
}

const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books']

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    image: product?.image || '',
    category: product?.category || 'Electronics',
    stock: product?.stock || 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const url = product ? `/api/products/${product._id}` : '/api/products'
      const method = product ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Failed to save product')

      router.push('/admin/products')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-lg bg-white p-6 shadow-md">
      {error && <div className="rounded bg-red-50 p-3 text-sm text-red-600">{error}</div>}
      <div>
        <label className="block text-sm font-medium text-gray-700">Product Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          rows={4}
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:outline-none"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            required
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            min="0"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
            required
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:outline-none"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="url"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          required
          placeholder="https://example.com/image.jpg"
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary focus:outline-none"
        />
        {formData.image && (
          <div className="mt-2 relative h-32 w-32 overflow-hidden rounded">
            <img src={formData.image} alt="Preview" className="h-full w-full object-cover" />
          </div>
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-secondary px-4 py-2 font-medium text-white hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
      </button>
    </form>
  )
}