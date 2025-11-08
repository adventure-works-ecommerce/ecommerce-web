"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { products } from "@/lib/products-data"
import { Header } from "@/components/header"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

export default function AccessoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("relevance")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const { addItem } = useCart()
  const { toast } = useToast()

  // Filter to show only accessories
  const accessoryProducts = products.filter((p) => p.type === "Accessories")

  const categories = ["all", "Llantas", "Cadenas", "Pedales", "Sillines", "Luces", "Manillares"]

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = accessoryProducts

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category?.toLowerCase().includes(searchQuery.toLowerCase()),
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
  }, [searchQuery, sortBy, selectedCategory, accessoryProducts])

  const handleQuickAdd = (product: (typeof products)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      color: product.colors[0].name,
      size: product.sizes[0].value,
      image: product.image,
    })

    toast({
      title: "Producto añadido al carrito",
      description: `${product.name} se ha añadido a tu carrito.`,
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">ACCESORIOS PARA BICICLETAS</h1>
          <p className="text-xl text-blue-100">Todo lo que necesitas para mejorar tu experiencia de ciclismo</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Buscar accesorios..."
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
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category === "all" ? "Todos" : category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-lg font-medium">{filteredAndSortedProducts.length} ACCESORIOS</div>
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
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No se encontraron accesorios</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
            {filteredAndSortedProducts.map((product) => (
              <div key={product.id} className="group">
                <Link href={`/products/${product.id}`} className="block">
                  <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                  <p className="text-gray-600 mb-1">
                    ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
                  </p>
                  <p className="text-xs text-gray-500 uppercase">{product.category}</p>
                </Link>
                <Button
                  onClick={() => handleQuickAdd(product)}
                  className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  AÑADIR AL CARRITO
                </Button>
              </div>
            ))}
          </div>
        )}
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
