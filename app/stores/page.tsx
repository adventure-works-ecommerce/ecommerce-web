"use client"

import { MapPin, Phone, Clock, Mail } from "lucide-react"
import { Header } from "@/components/header"

const stores = [
  {
    id: 1,
    name: "Adventure Works San Salvador",
    address: "Centro Comercial Multiplaza, Local 205, San Salvador",
    phone: "+503 2222-3333",
    email: "sansalvador@adventureworks.com",
    hours: "Lunes a Sábado: 9:00 AM - 8:00 PM\nDomingo: 10:00 AM - 6:00 PM",
    image: "/images/store-pickup.jpg",
    mapUrl: "https://maps.google.com/?q=Multiplaza+San+Salvador",
  },
  {
    id: 2,
    name: "Adventure Works Santa Ana",
    address: "Metrocentro Santa Ana, Nivel 2, Local 312, Santa Ana",
    phone: "+503 2440-5566",
    email: "santaana@adventureworks.com",
    hours: "Lunes a Sábado: 9:00 AM - 8:00 PM\nDomingo: 10:00 AM - 6:00 PM",
    image: "/images/mountain-category.jpg",
    mapUrl: "https://maps.google.com/?q=Metrocentro+Santa+Ana",
  },
  {
    id: 3,
    name: "Adventure Works La Libertad",
    address: "Boulevard Costa del Sol, Km 45, La Libertad",
    phone: "+503 2335-7788",
    email: "lalibertad@adventureworks.com",
    hours: "Lunes a Domingo: 8:00 AM - 7:00 PM",
    image: "/images/road-category.jpg",
    mapUrl: "https://maps.google.com/?q=La+Libertad+El+Salvador",
  },
]

export default function StoresPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">NUESTRAS TIENDAS</h1>
          <p className="text-xl text-gray-300">Visítanos en cualquiera de nuestras ubicaciones en El Salvador</p>
        </div>
      </div>

      {/* Stores Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {stores.map((store) => (
            <div key={store.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              {/* Store Image */}
              <div className="h-48 overflow-hidden">
                <img src={store.image || "/placeholder.svg"} alt={store.name} className="w-full h-full object-cover" />
              </div>

              {/* Store Info */}
              <div className="p-6 space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">{store.name}</h2>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-600">{store.address}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <a href={`tel:${store.phone}`} className="text-gray-600 hover:text-blue-600">
                      {store.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <a href={`mailto:${store.email}`} className="text-gray-600 hover:text-blue-600">
                      {store.email}
                    </a>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div className="text-gray-600 whitespace-pre-line">{store.hours}</div>
                  </div>
                </div>

                <a
                  href={store.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-medium transition-colors mt-6"
                >
                  VER EN MAPA
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">¿Necesitas ayuda?</h3>
          <p className="text-gray-600 mb-6">
            Nuestro equipo de expertos está listo para ayudarte a encontrar la bicicleta perfecta y los accesorios que
            necesitas.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+50322223333"
              className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              LLAMAR AHORA
            </a>
            <a
              href="mailto:info@adventureworks.com"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              ENVIAR EMAIL
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold tracking-wide">
                ADVENTURE
                <br />
                WORKS
              </h1>
            </div>
            <div className="grid grid-cols-3 gap-8 text-sm">
              <div>
                <h5 className="font-semibold mb-2">Features</h5>
                <ul className="space-y-1">
                  <li>Integrations</li>
                  <li>Enterprise</li>
                  <li>Solutions</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-2">Features</h5>
                <ul className="space-y-1">
                  <li>Integrations</li>
                  <li>Enterprise</li>
                  <li>Solutions</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-2">Features</h5>
                <ul className="space-y-1">
                  <li>Integrations</li>
                  <li>Enterprise</li>
                  <li>Solutions</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="text-center text-xs text-gray-400 mt-8">ADVENTURE WORKS © 2025. ALL RIGHTS RESERVED</div>
        </div>
      </footer>
    </div>
  )
}
