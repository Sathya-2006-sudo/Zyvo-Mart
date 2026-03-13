'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface UpdateOrderStatusProps {
  orderId: string
  currentStatus: string
}

export default function UpdateOrderStatus({ orderId, currentStatus }: UpdateOrderStatusProps) {
  const router = useRouter()
  const [status, setStatus] = useState(currentStatus)
  const [updating, setUpdating] = useState(false)

  const handleUpdate = async (newStatus: string) => {
    setUpdating(true)
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      setStatus(newStatus)
      router.refresh()
    } finally {
      setUpdating(false)
    }
  }

  return (
    <select
      value={status}
      onChange={(e) => handleUpdate(e.target.value)}
      disabled={updating}
      className="rounded border border-gray-300 px-2 py-1 text-xs disabled:opacity-50"
    >
      <option value="pending">Pending</option>
      <option value="paid">Paid</option>
      <option value="shipped">Shipped</option>
      <option value="delivered">Delivered</option>
    </select>
  )
}