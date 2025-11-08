"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    dui: "",
    telefono: "",
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

    const supabase = createClient()

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.correoElectronico,
        password: formData.contrasena,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/`,
          data: {
            nombre_completo: formData.nombreCompleto,
            dui: formData.dui,
            telefono: formData.telefono,
          },
        },
      })

      if (error) throw error

      // Redirect to success page
      router.push("/signup-success")
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
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-black tracking-wide">
              ADVENTURE
              <br />
              WORKS
            </h1>
          </div>

          {/* Title */}
          <h2 className="text-xl font-medium text-black mb-8">Registrarse</h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Nombre Completo<span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="Enter you password"
                value={formData.nombreCompleto}
                onChange={(e) => handleInputChange("nombreCompleto", e.target.value)}
                className="w-full h-12 px-4 border border-gray-300 rounded-full bg-white text-gray-600 placeholder:text-gray-400 focus:border-gray-400 focus:ring-0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                DUI<span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="Enter you password"
                value={formData.dui}
                onChange={(e) => handleInputChange("dui", e.target.value)}
                className="w-full h-12 px-4 border border-gray-300 rounded-full bg-white text-gray-600 placeholder:text-gray-400 focus:border-gray-400 focus:ring-0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Telefono<span className="text-red-500">*</span>
              </label>
              <Input
                type="tel"
                placeholder="Enter you password"
                value={formData.telefono}
                onChange={(e) => handleInputChange("telefono", e.target.value)}
                className="w-full h-12 px-4 border border-gray-300 rounded-full bg-white text-gray-600 placeholder:text-gray-400 focus:border-gray-400 focus:ring-0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Correo Electronico<span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                placeholder="Enter you password"
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
              <Input
                type="password"
                placeholder="Enter you password"
                value={formData.contrasena}
                onChange={(e) => handleInputChange("contrasena", e.target.value)}
                className="w-full h-12 px-4 border border-gray-300 rounded-full bg-white text-gray-600 placeholder:text-gray-400 focus:border-gray-400 focus:ring-0"
                required
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button
              type="submit"
              className="w-full h-12 bg-black hover:bg-gray-800 text-white rounded-full font-medium mt-8"
              disabled={isLoading}
            >
              {isLoading ? "Registrando..." : "Registrarse"}
            </Button>
          </form>

          {/* Sign in link */}
          <div className="text-center mt-6">
            <span className="text-sm text-gray-600">¿Ya tienes una cuenta? </span>
            <button
              onClick={() => router.push("/login")}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Inicia sesion
            </button>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="flex-1 relative">
        <img
          src="/images/cyclist.jpg"
          alt="Cyclist in aerodynamic position on time trial bike"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}
