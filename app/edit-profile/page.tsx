"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function EditProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    dui: "",
    telefono: "",
  })

  useEffect(() => {
    const loadUserData = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      const metadata = user.user_metadata
      setFormData({
        nombreCompleto: metadata?.nombre_completo || "",
        dui: metadata?.dui || "",
        telefono: metadata?.telefono || "",
      })
      setLoading(false)
    }

    loadUserData()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const supabase = createClient()

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          nombre_completo: formData.nombreCompleto,
          dui: formData.dui,
          telefono: formData.telefono,
        },
      })

      if (error) throw error

      toast({
        title: "Perfil actualizado",
        description: "Tus datos han sido actualizados correctamente",
      })

      router.push("/profile")
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudo actualizar el perfil",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="h-1 bg-blue-500"></div>

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Editar Perfil</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Nombre Completo<span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={formData.nombreCompleto}
                    onChange={(e) => setFormData({ ...formData, nombreCompleto: e.target.value })}
                    className="w-full h-12 px-4 border border-gray-300 rounded-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    DUI<span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={formData.dui}
                    onChange={(e) => setFormData({ ...formData, dui: e.target.value })}
                    className="w-full h-12 px-4 border border-gray-300 rounded-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Teléfono<span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full h-12 px-4 border border-gray-300 rounded-full"
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    className="flex-1 h-12 bg-black hover:bg-gray-800 text-white rounded-full"
                    disabled={saving}
                  >
                    {saving ? "Guardando..." : "Guardar Cambios"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 h-12 rounded-full bg-transparent"
                    onClick={() => router.push("/profile")}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-black text-white py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-lg font-bold tracking-wide mb-8">
                ADVENTURE
                <br />
                WORKS
              </h1>
            </div>
            <div className="grid grid-cols-3 gap-16 text-sm">
              <div>
                <h5 className="font-semibold mb-3">Features</h5>
                <ul className="space-y-2 text-gray-400">
                  <li>Integrations</li>
                  <li>Enterprise</li>
                  <li>Solutions</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-3">Features</h5>
                <ul className="space-y-2 text-gray-400">
                  <li>Integrations</li>
                  <li>Enterprise</li>
                  <li>Solutions</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-3">Features</h5>
                <ul className="space-y-2 text-gray-400">
                  <li>Integrations</li>
                  <li>Enterprise</li>
                  <li>Solutions</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="text-center text-xs text-gray-400 mt-12 pt-8 border-t border-gray-800">
            ADVENTURE WORKS © 2025. ALL RIGHTS RESERVED
          </div>
        </div>
      </footer>
    </div>
  )
}
