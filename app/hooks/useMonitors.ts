"use client"
import { useAuth } from '@/context/AuthContext'
import api from '@/lib/axios'
import { useState, useEffect } from 'react'

type CheckResult = {
  id: string
  statusCode: number
  responseMs: number
  checkedAt: string
  monitorId: string
}

type Monitors = {
  id: string
  url: string
  name?: string
  intervalMin: number
  checkResults: CheckResult[]
  uptimePercent: number
  avgResponseMs: number
  latestCheck: CheckResult | undefined
}

export const useMonitors = () => {
  const { loading: authLoading, accessToken } = useAuth()
  const [monitors, setMonitors] = useState<Monitors[]>([])

  const fetchMonitors = async () => {
    const res = await api.get('/api/monitors')
    setMonitors(res.data)
  }

  useEffect(() => {
    if (!authLoading) {   // only fetch once auth check has FINISHED
      fetchMonitors()
    }
  }, [authLoading])

  return { monitors, refetch: fetchMonitors }
}