// components/Modals/FormModal.tsx
import React from 'react'

type Props = {
  open: boolean
  onClose: () => void
  onCancel: () => void
  title: string
  children: React.ReactNode
}

const FormModal = ({ open, onClose, onCancel, title, children }: Props) => {
  if (!open) return null   // don't render anything if closed

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h1 className='border-b-2 border-gray-400' >{title}</h1>
          <button onClick={onClose}>X</button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  )
}

export default FormModal