"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import AdminDashboard from "@/components/admin/AdminDashboard"

export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true) // Loading while checking auth

  useEffect(() => {
    // Check authentication by calling a protected API
    fetch("/api/admin/case-studies")
      .then(res => {
        if (res.status === 401) {
          // Not authenticated → redirect to login
          router.push("/admin/login")
        } else {
          // Authenticated → show dashboard
          setLoading(false)
        }
      })
      .catch(() => {
        // Any error → redirect to login
        router.push("/admin/login")
      })
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Checking authentication...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <AdminDashboard />
      <Footer />
    </div>
  )
}