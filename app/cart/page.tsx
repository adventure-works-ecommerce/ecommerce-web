"use client"

import { Plus, Minus, Trash2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { Header } from "@/components/header"

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      {/* Blue accent line */}
      <div className="h-1 bg-blue-500"></div>

      {/* Cart Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold mb-2">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-6">Agrega productos para comenzar tu compra</p>
            <Link href="/products">
              <Button className="bg-black hover:bg-gray-800 text-white px-8 py-3">Explorar productos</Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Table */}
            <div className="mb-12">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-300 mb-6">
                <div className="col-span-5 text-sm font-medium text-gray-600">ITEM</div>
                <div className="col-span-2 text-sm font-medium text-gray-600">PRECIO</div>
                <div className="col-span-3 text-sm font-medium text-gray-600">CANTIDAD</div>
                <div className="col-span-2 text-sm font-medium text-gray-600 text-right">SUBTOTAL</div>
              </div>

              {items.map((item) => {
                const itemSubtotal = item.price * item.quantity

                return (
                  <div
                    key={`${item.id}-${item.color}-${item.size}`}
                    className="grid grid-cols-12 gap-4 items-center py-6 border-b border-gray-200"
                  >
                    {/* Product Info */}
                    <div className="col-span-5 flex items-center gap-4">
                      <div className="w-24 h-24 bg-gray-100 rounded flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-500">Color: {item.color}</p>
                        <p className="text-sm text-gray-500">Tamaño: {item.size}</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2">
                      <p className="font-medium">
                        ${item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="col-span-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => {
                            const val = Number.parseInt(e.target.value)
                            if (val > 0) updateQuantity(item.id, item.color, item.size, val)
                          }}
                          className="w-16 h-8 text-center border border-gray-300 rounded"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id, item.color, item.size)}
                          className="w-8 h-8 flex items-center justify-center border border-red-300 text-red-600 rounded hover:bg-red-50 ml-2"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="col-span-2 text-right">
                      <p className="font-medium">
                        ${itemSubtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Cart Summary */}
            <div className="flex justify-end">
              <div className="w-full max-w-md">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-bold">Subtotal</span>
                  <span className="text-2xl font-bold">
                    ${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
                  </span>
                </div>
                <Link href="/checkout">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg text-base font-medium">
                    IR A PAGAR
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
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
