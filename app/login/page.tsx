"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    correoElectronico: "",
    contrasena: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (formData.correoElectronico === "admin@admin.com" && formData.contrasena === "123456789!") {
      // Admin login - redirect to POS without database check
      router.push("/pos")
      return
    }

    const supabase = createClient()

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.correoElectronico,
        password: formData.contrasena,
      })

      if (error) throw error

      // Redirect to homepage after successful login
      router.push("/")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 bg-white flex flex-col">
        {/* Header with back button */}
        <div className="p-6">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">regresar</span>
          </button>
        </div>

        {/* Form content */}
        <div className="flex-1 flex flex-col justify-center px-12 max-w-md mx-auto w-full">
          {/* Logo */}
          <div className="text-center mb-12">
            <h1 className="text-2xl font-bold text-black tracking-wide">
              ADVENTURE
              <br />
              WORKS
            </h1>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-medium text-black mb-10">Iniciar sesión</h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Correo Electronico<span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={formData.correoElectronico}
                onChange={(e) => handleInputChange("correoElectronico", e.target.value)}
                className="w-full h-12 px-4 border border-gray-300 rounded-full bg-white text-gray-600 placeholder:text-gray-400 focus:border-gray-400 focus:ring-0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Contraseña<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.contrasena}
                  onChange={(e) => handleInputChange("contrasena", e.target.value)}
                  className="w-full h-12 px-4 pr-12 border border-gray-300 rounded-full bg-white text-gray-600 placeholder:text-gray-400 focus:border-gray-400 focus:ring-0"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button
              type="submit"
              className="w-full h-12 bg-black hover:bg-gray-800 text-white rounded-full font-medium mt-8"
              disabled={isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </form>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="flex-1 relative">
        <img src="/images/login-cyclist.jpg" alt="Cyclist racing on road bike" className="w-full h-full object-cover" />
      </div>
    </div>
  )
}
