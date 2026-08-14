'use client'
import { useState } from 'react'
import FormModal from '@/components/Modals/FormModal'
import AddMonitorForm from '@/components/Modals/AddMonitorForm'
import { useMonitors } from '@/hooks/useMonitors'

const Dashboard = () => {
  const [open, setOpen] = useState(false)
  const { monitors, refetch } = useMonitors()

  return (
    <div>
      <h1>Welcome to the dashboard</h1>
      <button onClick={() => setOpen(true)}>+ Add Monitor</button>

      <FormModal
        open={open}
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        title="Add Monitor"
      >
        <AddMonitorForm
          onClose={() => setOpen(false)}
          onSuccess={refetch}
        />
      </FormModal>

      <div>
        {monitors.map((item) => {
          const latestCheck = item.checkResults[0]
          const isUp = latestCheck?.statusCode === 200

          return (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: isUp ? '#22C55E' : '#EF4444', fontSize: '20px' }}>●</span>
              <span>{item.name || item.url}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard