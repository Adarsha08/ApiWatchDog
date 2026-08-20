// app/dashboard/[id]/page.tsx
'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMonitorDetail } from '@/hooks/useMonitorsDetails'

export default function MonitorDetailPage() {
  const params = useParams()
  const id = params.id as string

  const { monitor, loading, error } = useMonitorDetail(id)

  if (loading) return <p className="p-6 text-gray-400">Loading...</p>
  if (error) return <p className="p-6 text-red-500">{error}</p>
  if (!monitor) return null

  const checks = monitor.checkResults
  const total = checks.length
  const upCount = checks.filter((c) => c.statusCode === 200).length
  const uptimePercent = total > 0 ? ((upCount / total) * 100).toFixed(2) : '100.00'
  const latestCheck = checks[0]
  const isUp = latestCheck?.statusCode === 200

  const avgResponseMs = total > 0
    ? Math.round(checks.reduce((sum, c) => sum + c.responseMs, 0) / total)
    : 0

  // recent incidents — consecutive-ish failed checks, simplified to just list failures
  const incidents = checks.filter((c) => c.statusCode !== 200).slice(0, 5)

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link href="/Dashboard" className="text-blue-400 text-sm">← Back to Dashboard</Link>

      <div className="flex items-center gap-2 mt-4">
        <span className={isUp ? 'text-green-500' : 'text-red-500'}>●</span>
        <h1 className="text-xl font-semibold">{monitor.name || monitor.url}</h1>
      </div>
      <p className="text-gray-400 text-sm mt-1">{monitor.url}</p>

      <div className="flex gap-6 mt-4 text-sm">
        <p>
          Status: <span className={isUp ? 'text-green-500' : 'text-red-500'}>{isUp ? 'Up' : 'Down'}</span>
        </p>
        <p>Overall Uptime: <span className="font-medium">{uptimePercent}%</span></p>
        <p>Avg Response: <span className="font-medium">{avgResponseMs}ms</span></p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mt-6">
        <h2 className="text-sm text-gray-400 mb-3">Check History ({total} checks)</h2>

        <div className="flex gap-1">
          {checks.slice(0, 50).reverse().map((c) => (
            <div
              key={c.id}
              title={`${c.statusCode} at ${new Date(c.checkedAt).toLocaleString()}`}
              className={`h-6 flex-1 rounded-sm ${c.statusCode === 200 ? 'bg-green-500' : 'bg-red-500'}`}
            />
          ))}
        </div>

        <h3 className="text-sm text-gray-400 mt-6 mb-2">Incidents ({incidents.length})</h3>
        {incidents.length === 0 ? (
          <p className="text-sm text-gray-500">No incidents recorded.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {incidents.map((inc) => (
              <div key={inc.id} className="bg-red-950/40 border border-red-900 rounded-lg p-3 text-sm">
                <p className="text-red-400">
                  {new Date(inc.checkedAt).toLocaleString()} — Status {inc.statusCode || 'unreachable'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}