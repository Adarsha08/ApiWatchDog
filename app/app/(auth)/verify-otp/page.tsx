// app/(auth)/verify-otp/page.tsx
'use client'
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export default function VerifyOtpPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''
  const router = useRouter()

  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleVerify = async () => {
      console.log('Verifying with email:', email) 
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Verification failed')
      }
      router.push('/login')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-xl font-semibold">Verify your email</h1>
      <p className="text-sm text-gray-500">Enter the code sent to {email}</p>

      <InputOTP maxLength={6} value={code} onChange={setCode}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleVerify}
        disabled={loading || code.length < 6}
        className="bg-black text-white px-6 py-2 rounded-lg disabled:opacity-50"
      >
        {loading ? 'Verifying...' : 'Verify'}
      </button>
    </div>
  )
}   