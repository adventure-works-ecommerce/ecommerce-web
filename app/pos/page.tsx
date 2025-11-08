"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, ShoppingCart, DollarSign, Receipt } from "lucide-react"
import { getAllProducts } from "@/lib/products-data"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface POSItem {
  productCode: string
  name: string
  price: number
  quantity: number
}

export default function POSPage() {
  const [items, setItems] = useState<POSItem[]>([])
  const [productCode, setProductCode] = useState("")
  const [customerName, setCustomerName] = useState("Consumidor final")
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerAddress, setCustomerAddress] = useState("")
  const [amountPaid, setAmountPaid] = useState("")
  const [showPayment, setShowPayment] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const products = getAllProducts()

  const handleNumberClick = (num: string) => {
    setProductCode((prev) => prev + num)
  }

  const handleClear = () => {
    setProductCode("")
  }

  const handleScanProduct = () => {
    if (!productCode.trim()) return

    const product = products.find((p) => p.id === productCode.trim())

    if (product) {
      const existingItem = items.find((item) => item.productCode === productCode)

      if (existingItem) {
        setItems(
          items.map((item) => (item.productCode === productCode ? { ...item, quantity: item.quantity + 1 } : item)),
        )
      } else {
        setItems([
          ...items,
          {
            productCode: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
          },
        ])
      }

      toast({
        title: "Producto agregado",
        description: `${product.name} agregado al carrito`,
      })
    } else {
      toast({
        title: "Producto no encontrado",
        description: `No se encontró el producto con código: ${productCode}`,
        variant: "destructive",
      })
    }

    setProductCode("")
  }

  const handleRemoveItem = (productCode: string) => {
    setItems(items.filter((item) => item.productCode !== productCode))
  }

  const handleUpdateQuantity = (productCode: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productCode)
      return
    }
    setItems(items.map((item) => (item.productCode === productCode ? { ...item, quantity } : item)))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.13
  const total = subtotal + tax
  const change = amountPaid ? Number.parseFloat(amountPaid) - total : 0

  const handleTotal = () => {
    if (items.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "Agrega productos antes de procesar el pago",
        variant: "destructive",
      })
      return
    }
    setShowPayment(true)
  }

  const handleCompleteSale = async () => {
    if (!amountPaid || Number.parseFloat(amountPaid) < total) {
      toast({
        title: "Monto insuficiente",
        description: "El monto pagado debe ser mayor o igual al total",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      const { sendPhysicalSaleEmail } = await import("@/app/actions/send-physical-sale-email")

      const orderNumber = `POS-${Date.now()}`

      await sendPhysicalSaleEmail({
        orderNumber,
        items: items.map((item) => ({
          id: item.productCode,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: products.find((p) => p.id === item.productCode)?.image || "",
        })),
        subtotal,
        tax,
        total,
        customerName: customerName || "Consumidor final",
        customerEmail: customerEmail || "00067621@uca.edu.sv",
        customerAddress: customerAddress || "Venta en tienda física",
        amountPaid: Number.parseFloat(amountPaid),
        change,
      })

      toast({
        title: "Venta completada",
        description: `Orden ${orderNumber} procesada exitosamente. Cambio: $${change.toFixed(2)}`,
      })

      // Reset form
      setItems([])
      setCustomerName("Consumidor final")
      setCustomerEmail("")
      setCustomerAddress("")
      setAmountPaid("")
      setShowPayment(false)
    } catch (error) {
      console.error("[v0] Error processing sale:", error)
      toast({
        title: "Error",
        description: "No se pudo procesar la venta",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="bg-black text-white p-4 rounded-lg mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">ADVENTURE WORKS</h1>
          <p className="text-sm text-gray-300">Sistema Punto de Venta</p>
        </div>
        <Link href="/">
          <Button variant="outline" className="bg-white text-black hover:bg-gray-100">
            Salir
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Side - Products and Scanner */}
        <div className="lg:col-span-2 space-y-4">
          {/* Scanner */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Escanear Producto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={productCode}
                    onChange={(e) => setProductCode(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleScanProduct()}
                    placeholder="Código del producto"
                    className="flex-1 text-lg"
                  />
                  <Button onClick={handleScanProduct} className="bg-blue-600 hover:bg-blue-700">
                    Agregar
                  </Button>
                </div>

                {/* Number Pad */}
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <Button
                      key={num}
                      onClick={() => handleNumberClick(num.toString())}
                      variant="outline"
                      className="h-16 text-xl font-semibold"
                    >
                      {num}
                    </Button>
                  ))}
                  <Button onClick={handleClear} variant="outline" className="h-16 text-xl font-semibold bg-transparent">
                    C
                  </Button>
                  <Button
                    onClick={() => handleNumberClick("0")}
                    variant="outline"
                    className="h-16 text-xl font-semibold"
                  >
                    0
                  </Button>
                  <Button
                    onClick={handleScanProduct}
                    className="h-16 text-xl font-semibold bg-green-600 hover:bg-green-700"
                  >
                    ✓
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cart Items */}
          <Card>
            <CardHeader>
              <CardTitle>Productos en Carrito ({items.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {items.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No hay productos en el carrito</p>
              ) : (
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.productCode} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Código: {item.productCode}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateQuantity(item.productCode, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateQuantity(item.productCode, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                        <p className="font-semibold w-24 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                        <Button size="sm" variant="destructive" onClick={() => handleRemoveItem(item.productCode)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Totals and Payment */}
        <div className="space-y-4">
          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle>Información del Cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium">Nombre</label>
                <Input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Consumidor final"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email (opcional)</label>
                <Input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="email@ejemplo.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Dirección (opcional)</label>
                <Input
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="Dirección del cliente"
                />
              </div>
            </CardContent>
          </Card>

          {/* Totals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="w-5 h-5" />
                Resumen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-lg">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>IVA (13%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-2xl font-bold border-t pt-3">
                <span>TOTAL:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {!showPayment ? (
                <Button onClick={handleTotal} className="w-full h-14 text-lg bg-green-600 hover:bg-green-700">
                  <DollarSign className="w-5 h-5 mr-2" />
                  COBRAR
                </Button>
              ) : (
                <div className="space-y-3 pt-3 border-t">
                  <div>
                    <label className="text-sm font-medium">Monto Pagado</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={amountPaid}
                      onChange={(e) => setAmountPaid(e.target.value)}
                      placeholder="0.00"
                      className="text-xl font-semibold"
                    />
                  </div>
                  {amountPaid && Number.parseFloat(amountPaid) >= total && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Cambio:</p>
                      <p className="text-3xl font-bold text-green-600">${change.toFixed(2)}</p>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button onClick={() => setShowPayment(false)} variant="outline" className="flex-1">
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleCompleteSale}
                      disabled={isProcessing || !amountPaid || Number.parseFloat(amountPaid) < total}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      {isProcessing ? "Procesando..." : "Completar"}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardContent className="pt-6">
              <Button
                onClick={() => {
                  setItems([])
                  setShowPayment(false)
                  setAmountPaid("")
                }}
                variant="outline"
                className="w-full"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Limpiar Todo
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
