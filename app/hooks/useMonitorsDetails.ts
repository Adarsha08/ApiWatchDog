// hooks/useMonitorDetail.ts
"use client"
import api from '@/lib/axios'
import { useState, useEffect } from 'react'

type CheckResult = {
  id: string
  statusCode: number
  responseMs: number
  checkedAt: string
  monitorId: string
}

type MonitorDetail = {
  id: string
  url: string
  name?: string
  intervalMin: number
  createdAt: string
  checkResults: CheckResult[]
}

export const useMonitorDetail = (id: string) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const [monitor, setMonitor] = useState<MonitorDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

 const fetchMonitor = async () => {
  try {
    setLoading(true)
    const res = await api.get(`/api/monitors/${id}`)
    setMonitor(res.data)
  } catch (err) {
    setError('Could not load this monitor')
  } finally {
    setLoading(false)
  }
}

  useEffect(() => {
    if (id) fetchMonitor()
  }, [id])

  return { monitor, loading, error, refetch: fetchMonitor }
}