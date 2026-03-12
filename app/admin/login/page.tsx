"use client"

import { useState } from "react"

export default function AdminLogin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // ✅ Hits the bridge API that sets the adminToken cookie
      const res = await fetch("/api/admin/case-studies/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Invalid credentials")
        setLoading(false)
        return
      }

      // ✅ SUCCESS: 
      // Using window.location.href instead of router.push ensures the browser 
      // fully registers the 'httpOnly' cookie before loading the dashboard.
      window.location.href = "/admin"

    } catch (err) {
      console.error("Login error:", err)
      setError("Connection failed. Ensure your Express server (3001) is running.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            type="text"
            className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-black text-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-black text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-2 mb-4">
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        )}

        <button
          type="submit"
          className={`w-full p-2 text-white font-semibold rounded transition-all ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800 active:scale-95"
          }`}
          disabled={loading}
        >
          {loading ? "Authenticating..." : "Login"}
        </button>
      </form>
    </div>
  )
}