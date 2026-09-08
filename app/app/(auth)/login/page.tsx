"use client";

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

type LoginForm = {
  email: string
  password: string
}

export default function Login() {
  const auth = useAuth()
  const router = useRouter()

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>()

  const onSubmit = async (data: LoginForm) => {
    try {
      setError("")
      setLoading(true)

         await auth.login(data.email,data.password)
        router.push('/Dashboard')

    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 bg-gray-900 flex-col justify-between p-12">
        <div>
          <h1 className="text-white text-2xl font-bold">FitPro</h1>
        </div>

        <div>
          <h2 className="text-white text-4xl font-bold leading-tight mb-4">
            Manage your gym<br />smarter
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            A unified platform for admins, trainers, and members. Track workouts, sessions, and subscriptions in one place.
          </p>
        </div>

        <div className="flex gap-8">
          <div>
            <p className="text-white text-2xl font-bold">4</p>
            <p className="text-gray-500 text-xs uppercase">Role types</p>
          </div>
          <div>
            <p className="text-white text-2xl font-bold">12+</p>
            <p className="text-gray-500 text-xs uppercase">Features</p>
          </div>
          <div>
            <p className="text-white text-2xl font-bold">100%</p>
            <p className="text-gray-500 text-xs uppercase">Secure</p>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">

        <div className="w-full max-w-sm">

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">Sign in</h2>
            <p className="text-gray-500 text-sm mt-1">
              Enter your credentials to continue
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Email
              </label>

              <input
                {...register("email", {
                  required: "Email is required"
                })}
                type="email"
                placeholder="you@example.com"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
              />

              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>

              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters"
                  }
                })}
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
              />

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 transition disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

          </form>
          <button className='cursor-pointer' onClick={() => router.push("/register")}>
Dont have a account 
</button>
        </div>
      </div>
    </div>
  )
}