'use client'
import { useState, useEffect } from 'react'
import FormModal from '@/components/Modals/FormModal'
import AddMonitorForm from '@/components/Modals/AddMonitorForm'
import { useMonitors } from '@/hooks/useMonitors'

type Monitor = {
  id: string
  url: string
  name?: string
  intervalMin: number
}

const Dashboard = () => {
  const [open, setOpen] = useState(false)
  const{monitors,refetch}=useMonitors()
  

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
        {monitors.map((item) => (
          <div key={item.id}>{item.url}</div>
        ))}
      </div>
    </div>

    
  )
}

export default Dashboard