'use client'
import { useState } from 'react'
import FormModal from '@/components/Modals/FormModal'
import AddMonitorForm from '@/components/Modals/AddMonitorForm'
import { useMonitors } from '@/hooks/useMonitors'
import api from '@/lib/axios'
import Link from 'next/link'

const Dashboard = () => {
  const [open, setOpen] = useState(false)
  const { monitors, refetch } = useMonitors()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleDelete = async () => {
    if (!deleteId) return
    await api.delete(`/api/monitors/${deleteId}`)
    setDeleteId(null)
    refetch()
  }

  return (
    <div className='mr-6 ml-6 mt-4'>
      <div className='flex justify-between'>
        <p className='text-gray-500'>Your Monitors : {monitors.length} total</p>
        <button
          className='bg-green-600 text-white w-40 rounded-2xl h-8 cursor-pointer'
          onClick={() => setOpen(true)}
        >
          + Add Monitor
        </button>
      </div>

      <FormModal open={open} onClose={() => setOpen(false)} onCancel={() => setOpen(false)} title="Add Monitor">
        <AddMonitorForm onClose={() => setOpen(false)} onSuccess={refetch} />
      </FormModal>

      <div>
        {(monitors || []).map((item) => {
          const isUp = item.latestCheck ? item.latestCheck.statusCode >= 200 && item.latestCheck.statusCode < 300 : false

          return (
            <div
              key={item.id}
              className={`bg-gray-100 mt-10 border rounded-2xl p-5 mb-4 ${isUp ? 'border-zinc-800' : 'border-red-800'}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={isUp ? 'text-green-500' : 'text-red-500'}>●</span>
                <span className="text-black">{item.url}</span>
              </div>

              <p className={isUp ? 'text-zinc-400' : 'text-red-400'}>
                {item.uptimePercent}% uptime · {item.avgResponseMs}ms response time
              </p>

              <p className="text-zinc-500 text-sm">
                Checking every {item.intervalMin} min · Last checked{' '}
                {item.latestCheck ? new Date(item.latestCheck.checkedAt).toLocaleTimeString() : 'never'}
              </p>

              <div className="h-1.5 bg-zinc-800 rounded-full mt-3 overflow-hidden">
                <div
                  className={`h-full ${isUp ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: `${item.uptimePercent}%` }}
                />
              </div>

              <div className="flex justify-end gap-4 mt-3 text-sm">
              
                <button onClick={() => setDeleteId(item.id)} className="text-red-600">Delete</button>
                <Link href={`/Dashboard/${item.id}`} className="text-blue-400">View</Link>
              </div>
            </div>
          )
        })}
      </div>

      <FormModal open={!!deleteId} onClose={() => setDeleteId(null)} onCancel={() => setDeleteId(null)} title="Delete Monitor">
        <div className='flex flex-col gap-8'>
          <h1>Are you sure want to delete it?</h1>
          <div className='flex justify-between'>
            <button onClick={() => setDeleteId(null)} className='bg-gray-500 text-white w-30 h-8 rounded-lg cursor-pointer hover:bg-gray-600'>Cancel</button>
            <button onClick={handleDelete} className='bg-red-500 text-white w-30 h-8 rounded-lg cursor-pointer hover:bg-red-600'>Delete</button>
          </div>
        </div>
      </FormModal>
    </div>
  )
}

export default Dashboard