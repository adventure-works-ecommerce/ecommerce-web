"use client"

import { useState } from "react"
import { ShoppingCart, User, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Header } from "@/components/header"

export default function HomePage() {
  const [selectedColor, setSelectedColor] = useState("black")

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-96 bg-gray-900 text-white">
        <img
          src="/images/hero-bike.jpg"
          alt="Adventure bike on wooden deck"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-lg">
              <h2 className="text-4xl font-bold mb-4">Adventure Starts Here!</h2>
              <p className="text-lg mb-6">
                Descubre la Summit X - Donde la ingeniería de precisión se encuentra con la aventura sin límites.
              </p>
              <Link href="/products">
                <Button className="bg-white text-black hover:bg-gray-100 px-6 py-2 rounded">Explorar ahora</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-2">
                <img
                  src="/images/touring-bike-1.jpg"
                  alt="Touring bike view 1"
                  className="w-full aspect-square object-cover rounded cursor-pointer"
                />
                <img
                  src="/images/touring-bike-2.jpg"
                  alt="Touring bike view 2"
                  className="w-full aspect-square object-cover rounded cursor-pointer"
                />
                <img
                  src="/images/touring-bike-3.jpg"
                  alt="Touring bike view 3"
                  className="w-full aspect-square object-cover rounded cursor-pointer"
                />
                <img
                  src="/images/touring-1000-main.jpg"
                  alt="Touring bike main"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="aspect-square">
                <img
                  src="/images/touring-1000-main.jpg"
                  alt="Touring-1000 main product"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold">Touring-1000</h3>
              <p className="text-2xl font-semibold">$2,199.00 USD</p>

              <p className="text-gray-600">
                Diseñada para largas distancias, con cuadro de aluminio ligero y componentes de alta calidad para
                recorridos urbanos, turismo en carretera y desplazamientos diarios con estilo y resistencia.
              </p>

              <div className="space-y-3">
                <p className="font-medium">COLOR: Matte Black</p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setSelectedColor("black")}
                    className={`w-8 h-8 bg-black rounded-full border-2 ${
                      selectedColor === "black" ? "border-gray-400" : "border-gray-200"
                    }`}
                  />
                  <button
                    onClick={() => setSelectedColor("gray")}
                    className={`w-8 h-8 bg-gray-400 rounded-full border-2 ${
                      selectedColor === "gray" ? "border-gray-400" : "border-gray-200"
                    }`}
                  />
                  <button
                    onClick={() => setSelectedColor("yellow")}
                    className={`w-8 h-8 bg-yellow-400 rounded-full border-2 ${
                      selectedColor === "yellow" ? "border-gray-400" : "border-gray-200"
                    }`}
                  />
                </div>
              </div>

              <Button className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded">COMPRAR AHORA</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/products" className="relative group cursor-pointer">
              <img src="/images/road-category.jpg" alt="Road bikes" className="w-full h-48 object-cover rounded-lg" />
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <h4 className="text-xl font-bold">Road</h4>
                  <p className="text-sm">COMPRAR BIKE</p>
                </div>
              </div>
            </Link>
            <Link href="/products" className="relative group cursor-pointer">
              <img
                src="/images/mountain-category.jpg"
                alt="Mountain bikes"
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <h4 className="text-xl font-bold">Mountain</h4>
                  <p className="text-sm">COMPRAR BIKE</p>
                </div>
              </div>
            </Link>
            <Link href="/products" className="relative group cursor-pointer">
              <img
                src="/images/touring-category.jpg"
                alt="Touring bikes"
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <h4 className="text-xl font-bold">Touring</h4>
                  <p className="text-sm">COMPRAR BIKE</p>
                </div>
              </div>
            </Link>
            <Link href="/products" className="relative group cursor-pointer">
              <img src="/images/ebike-category.jpg" alt="E-bikes" className="w-full h-48 object-cover rounded-lg" />
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <h4 className="text-xl font-bold">E-BIKE</h4>
                  <p className="text-sm">COMPRAR BIKE</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Lifestyle Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src="/images/lifestyle-woman.jpg"
              alt="Woman with bicycle lifestyle"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-end pr-8">
              <div className="text-white max-w-md">
                <h3 className="text-2xl font-bold mb-4">Diseñada para tu día completo</h3>
                <p className="mb-4">
                  Desde el primer café hasta la última parada, la Touring X se adapta a tu ritmo urbano con estilo,
                  comodidad y confianza.
                </p>
                <Button className="bg-white text-black hover:bg-gray-100 px-6 py-2 rounded">
                  Descubre la Touring X
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Touring Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Explora las Touring</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg p-6 text-center">
                <img
                  src={`/images/touring-bike-${i}.jpg`}
                  alt={`Touring-1000 model ${i}`}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h4 className="text-xl font-bold mb-2">Touring-1000</h4>
                <p className="text-lg font-semibold text-gray-600">$2,199.00 USD</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/products">
              <Button variant="outline" className="px-8 py-2 rounded bg-transparent">
                VER MAS
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600 mb-4">NUESTROS CLIENTES DICEN</p>
          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <blockquote className="text-xl max-w-2xl mx-auto">
            "Perfecta para el día a día. Ligera, estable y con excelente diseño. He recorrido la ciudad completa con mi
            Touring-1000 y aún se siente como nueva."
          </blockquote>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <h4 className="font-semibold">Tiendas</h4>
              <p className="text-sm">cerca de mi</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <h4 className="font-semibold">Ayuda</h4>
            </div>
            <div>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full border-2 border-white" />
              </div>
              <h4 className="font-semibold">Reembolsos</h4>
            </div>
            <div>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <h4 className="font-semibold">Formas de</h4>
              <p className="text-sm">compra</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Footer */}
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
          <div className="text-center text-xs text-gray-400 mt-8">ADVENTURE WORKS © 2024. ALL RIGHTS RESERVED</div>
        </div>
      </footer>

      {/* Add signup link */}
      <div className="fixed bottom-4 right-4">
        <Link href="/signup">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full">Registrarse</Button>
        </Link>
      </div>
    </div>
  )
}
