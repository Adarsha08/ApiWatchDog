// components/Modals/AddMonitorForm.tsx
'use client'
import api from '@/lib/axios'
import React, { useState } from 'react'

type Props = {
  onClose: () => void
  onSuccess: () => void
}

const AddMonitorForm = ({ onClose, onSuccess }: Props) => {
  const [url, setUrl] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setError('')

  try {
    await api.post('/api/monitors', { url, name })
    onSuccess()
    onClose()
  } catch (err: any) {
    setError(err.response?.data?.message || 'Could not reach the server')
  }
}

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div>
        <label className="text-sm text-gray-600">URL</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://myapp.com/api/health"
          required
          className="w-full border rounded p-2" 
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">Name (optional)</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Payment API"
          className="w-full border rounded p-2"
        />
      </div>

      <div className="flex justify-end gap-2 mt-2">
        <button type="button" onClick={onClose} className="px-4 py-2">
          Cancel
        </button>
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
          Add Monitor
        </button>
      </div>
    </form>
  )
}

export default AddMonitorForm