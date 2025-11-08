"use client"

import { useState } from "react"
import { ChevronUp, ChevronDown, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/products-data"
import { Header } from "@/components/header"

type ProductDetailProps = {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0].value)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0].value)
  const [expandedSections, setExpandedSections] = useState({
    description: false,
    technical: false,
    shipping: false,
  })

  const { addItem } = useCart()
  const { toast } = useToast()

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const thumbnails = product.images

  const handleAddToCart = () => {
    const selectedColorName = product.colors.find((c) => c.value === selectedColor)?.name || product.colors[0].name

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      color: selectedColorName,
      size: selectedSize,
      image: product.image,
    })

    toast({
      title: "Producto añadido al carrito",
      description: `${product.name} (${selectedColorName}, ${selectedSize}) se ha añadido a tu carrito.`,
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Product Detail */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col space-y-4">
              <ChevronUp className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-600" />
              {thumbnails.map((thumb, index) => (
                <div
                  key={index}
                  className="w-16 h-16 border border-gray-200 rounded cursor-pointer hover:border-gray-400"
                >
                  <img
                    src={thumb || "/placeholder.svg"}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              ))}
              <ChevronDown className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>

            {/* Main Image */}
            <div className="flex-1">
              <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-3xl font-semibold">
                ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
              </p>
            </div>

            <hr className="border-gray-300" />

            {/* Color Selection */}
            <div>
              <div className="flex items-center mb-3">
                <span className="font-medium">COLOR:</span>
                <span className="ml-2 text-gray-600">
                  {product.colors.find((c) => c.value === selectedColor)?.name}
                </span>
              </div>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color.value ? "border-black" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.color }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <hr className="border-gray-300" />

            {/* Size Selection */}
            <div>
              <div className="font-medium mb-3">TAMAÑO</div>
              <div className="grid grid-cols-4 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => setSelectedSize(size.value)}
                    className={`py-2 px-3 border text-sm font-medium ${
                      selectedSize === size.value
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button onClick={handleAddToCart} className="w-full bg-black text-white hover:bg-gray-800 py-3 text-lg">
                AÑADIR AL CARRITO
              </Button>
            </div>

            <hr className="border-gray-300" />

            {/* Expandable Sections */}
            <div className="space-y-4">
              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection("description")}
                  className="flex items-center justify-between w-full py-4 text-left font-medium"
                >
                  Descripción
                  <Plus className={`w-5 h-5 transition-transform ${expandedSections.description ? "rotate-45" : ""}`} />
                </button>
                {expandedSections.description && (
                  <div className="pb-4 text-gray-600">
                    <p>{product.description}</p>
                  </div>
                )}
              </div>

              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection("technical")}
                  className="flex items-center justify-between w-full py-4 text-left font-medium"
                >
                  Características Técnicas
                  <Plus className={`w-5 h-5 transition-transform ${expandedSections.technical ? "rotate-45" : ""}`} />
                </button>
                {expandedSections.technical && (
                  <div className="pb-4 text-gray-600">
                    <ul className="space-y-2">
                      {product.technicalSpecs.map((spec, index) => (
                        <li key={index}>• {spec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection("shipping")}
                  className="flex items-center justify-between w-full py-4 text-left font-medium"
                >
                  Envío y política de reembolso
                  <Plus className={`w-5 h-5 transition-transform ${expandedSections.shipping ? "rotate-45" : ""}`} />
                </button>
                {expandedSections.shipping && (
                  <div className="pb-4 text-gray-600">
                    <p>
                      Envío gratuito en pedidos superiores a $100. Entrega en 3-5 días hábiles. Política de devolución
                      de 30 días. Garantía de 2 años en cuadro y componentes.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-8 mt-16">
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
