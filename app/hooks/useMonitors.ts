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
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const [monitors, setMonitors] = useState<Monitors[]>([])

  const fetchMonitors = async () => {
    console.log('Auth header:', api.defaults.headers.common['Authorization'])
    const res =await api.get('/api/monitors')
  
    setMonitors(res.data)
  }

  useEffect(() => {
    fetchMonitors()
  }, [])

  return { monitors, refetch: fetchMonitors }
}