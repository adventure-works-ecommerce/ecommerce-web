import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/login")
  }

  const metadata = user.user_metadata

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="h-1 bg-blue-500"></div>

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Mi Perfil</h1>
            <Link href="/edit-profile">
              <Button className="bg-black hover:bg-gray-800 text-white">Editar Perfil</Button>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-600">Nombre Completo</label>
                <p className="text-lg mt-1">{metadata?.nombre_completo || "No especificado"}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Correo Electrónico</label>
                <p className="text-lg mt-1">{user.email}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">DUI</label>
                <p className="text-lg mt-1">{metadata?.dui || "No especificado"}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Teléfono</label>
                <p className="text-lg mt-1">{metadata?.telefono || "No especificado"}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Fecha de Registro</label>
                <p className="text-lg mt-1">{new Date(user.created_at).toLocaleDateString("es-ES")}</p>
              </div>
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
