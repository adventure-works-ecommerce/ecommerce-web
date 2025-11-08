"use client"

import { useState, useMemo } from "react"
import { Search, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { products } from "@/lib/products-data"
import { Header } from "@/components/header"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("relevance")

  const bikeProducts = products.filter((p) => p.type !== "Accessories")

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = bikeProducts

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.type.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply sorting
    const sorted = [...filtered]
    if (sortBy === "price-asc") {
      sorted.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-desc") {
      sorted.sort((a, b) => b.price - a.price)
    }

    return sorted
  }, [searchQuery, sortBy, bikeProducts])

  const displayProducts = filteredAndSortedProducts.map((product) => ({
    id: product.id,
    name: product.name,
    price: `$${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD`,
    image: product.image,
    type: product.type,
  }))

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Search Bar */}
      <div className="bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Buscar bicicletas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Products Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-lg font-medium">{displayProducts.length} BICICLETAS</div>
          <div className="flex items-center space-x-4">
            <select
              className="border border-gray-300 rounded px-3 py-1 text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="relevance">RELEVANCIA</option>
              <option value="price-asc">PRECIO: MENOR A MAYOR</option>
              <option value="price-desc">PRECIO: MAYOR A MENOR</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {displayProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No se encontraron bicicletas</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
            {displayProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="group cursor-pointer">
                <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                <p className="text-gray-600">{product.price}</p>
                <p className="text-xs text-gray-500 uppercase mt-1">{product.type}</p>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Promotional Banner */}
      <section className="relative h-64 bg-gray-900 text-white">
        <img
          src="/images/store-pickup.jpg"
          alt="Store pickup service"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">COMPRA EN LÍNEA, RECOGE EN TIENDA</h3>
            <Button className="bg-white text-black hover:bg-gray-100 px-6 py-2 rounded">SABER MÁS</Button>
          </div>
        </div>
      </section>

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
