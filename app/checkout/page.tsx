"use client"

import type React from "react"

import { useState } from "react"
import { ShoppingCart, CreditCard, Calendar, Lock, Home, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import {
  validateCardNumber,
  validateExpiryDate,
  validateCVV,
  formatCardNumber,
  formatExpiryDate,
} from "@/lib/card-validation"
import { Header } from "@/components/header"

type PaymentStatus = "idle" | "processing" | "success" | "error"

export default function CheckoutPage() {
  const { items, totalPrice, totalItems, clearCart } = useCart()

  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [billingAddress, setBillingAddress] = useState("")

  const [errors, setErrors] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
  })

  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle")
  const [orderNumber, setOrderNumber] = useState("")
  const [totalPaid, setTotalPaid] = useState(0)

  const shipping = 0.0
  const tax = totalPrice * 0.0
  const total = totalPrice + shipping + tax

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    if (formatted.length <= 19) {
      setCardNumber(formatted)
      if (errors.cardNumber) {
        setErrors({ ...errors, cardNumber: "" })
      }
    }
  }

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value)
    if (formatted.length <= 5) {
      setExpiryDate(formatted)
      if (errors.expiryDate) {
        setErrors({ ...errors, expiryDate: "" })
      }
    }
  }

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 4) {
      setCvv(value)
      if (errors.cvv) {
        setErrors({ ...errors, cvv: "" })
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset errors
    const newErrors = {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      billingAddress: "",
    }

    // Validate all fields
    let hasErrors = false

    if (!cardNumber.trim()) {
      newErrors.cardNumber = "El número de tarjeta es requerido"
      hasErrors = true
    } else if (!validateCardNumber(cardNumber)) {
      newErrors.cardNumber = "Número de tarjeta inválido"
      hasErrors = true
    }

    if (!expiryDate.trim()) {
      newErrors.expiryDate = "La fecha de vencimiento es requerida"
      hasErrors = true
    } else if (!validateExpiryDate(expiryDate)) {
      newErrors.expiryDate = "Fecha de vencimiento inválida o expirada"
      hasErrors = true
    }

    if (!cvv.trim()) {
      newErrors.cvv = "El CVV es requerido"
      hasErrors = true
    } else if (!validateCVV(cvv)) {
      newErrors.cvv = "CVV inválido"
      hasErrors = true
    }

    if (!billingAddress.trim()) {
      newErrors.billingAddress = "La dirección de facturación es requerida"
      hasErrors = true
    }

    if (hasErrors) {
      setErrors(newErrors)
      return
    }

    // Process payment
    setPaymentStatus("processing")

    setTotalPaid(total)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate random success/failure (90% success rate)
    const isSuccess = Math.random() > 0.1

    if (isSuccess) {
      // Generate order number
      const orderNum = "AW" + Date.now().toString().slice(-8)
      setOrderNumber(orderNum)
      setPaymentStatus("success")

      try {
        const { sendOrderEmail } = await import("@/app/actions/send-order-email")
        const result = await sendOrderEmail({
          orderNumber: orderNum,
          total: total,
          items: items,
          billingAddress: billingAddress,
        })

        if (result.success) {
          console.log("[v0] Email sent successfully:", result.emailId)
        } else {
          console.error("[v0] Failed to send email:", result.error)
        }
      } catch (error) {
        console.error("[v0] Error sending email:", error)
      }

      // Clear cart after successful payment
      setTimeout(() => {
        clearCart()
      }, 500)
    } else {
      setPaymentStatus("error")
    }
  }

  if (paymentStatus === "success") {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />

        {/* Success Content */}
        <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="max-w-md w-full bg-white p-12 rounded-lg text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">¡Compra exitosa!</h1>
            <p className="text-gray-600 mb-6">
              Tu pedido ha sido procesado correctamente. Recibirás un correo de confirmación en breve.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-500 mb-1">Número de orden</p>
              <p className="text-xl font-bold text-blue-600">{orderNumber}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg mb-8">
              <p className="text-sm text-gray-500 mb-1">Total pagado</p>
              <p className="text-2xl font-bold">
                ${totalPaid.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
              </p>
            </div>
            <div className="space-y-3">
              <Link href="/products" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Seguir comprando</Button>
              </Link>
              <Link href="/" className="block">
                <Button variant="outline" className="w-full bg-transparent">
                  Volver al inicio
                </Button>
              </Link>
            </div>
          </div>
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

  if (paymentStatus === "error") {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />

        {/* Error Content */}
        <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="max-w-md w-full bg-white p-12 rounded-lg text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Error en el pago</h1>
            <p className="text-gray-600 mb-8">
              Lo sentimos, hubo un problema al procesar tu pago. Por favor, verifica los datos de tu tarjeta e intenta
              nuevamente.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => setPaymentStatus("idle")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Intentar nuevamente
              </Button>
              <Link href="/cart" className="block">
                <Button variant="outline" className="w-full bg-transparent">
                  Volver al carrito
                </Button>
              </Link>
            </div>
          </div>
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Checkout Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold mb-2">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-6">Agrega productos para proceder al checkout</p>
            <Link href="/products">
              <Button className="bg-black hover:bg-gray-800 text-white px-8 py-3">Explorar productos</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left Side - Order Summary */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Resumen del pedido</h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={`${item.id}-${item.color}-${item.size}`} className="bg-white p-6 rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="w-24 h-24 bg-gray-100 rounded flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-500">Color: {item.color}</p>
                        <p className="text-sm text-gray-500">Tamaño: {item.size}</p>
                        <p className="text-sm text-gray-600 mt-2">Cantidad: {item.quantity}</p>
                        <p className="font-medium mt-2">
                          ${(item.price * item.quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="bg-white p-6 rounded-lg space-y-4">
                <div className="flex items-center justify-between text-base">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    ${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
                  </span>
                </div>
                <div className="flex items-center justify-between text-base">
                  <span className="text-gray-600">Envío</span>
                  <span className="font-medium">
                    {shipping === 0
                      ? "GRATIS"
                      : `$${shipping.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-base">
                  <span className="text-gray-600">Impuestos</span>
                  <span className="font-medium">${tax.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD</span>
                </div>
                <div className="flex items-center justify-between text-2xl pt-4 border-t border-gray-300">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">${total.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD</span>
                </div>
              </div>
            </div>

            {/* Right Side - Payment Form */}
            <div>
              <div className="bg-white p-8 rounded-lg border border-gray-300">
                <h2 className="text-xl font-bold mb-6">Información de pago</h2>

                {/* Card Number */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Número de tarjeta</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.cardNumber ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />
                  </div>
                  {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                </div>

                {/* Expiry Date and CVV */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de vencimiento</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="MM/AA"
                        value={expiryDate}
                        onChange={handleExpiryDateChange}
                        className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.expiryDate ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />
                    </div>
                    {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="123"
                        value={cvv}
                        onChange={handleCvvChange}
                        maxLength={4}
                        className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.cvv ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />
                    </div>
                    {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                  </div>
                </div>

                {/* Billing Address */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dirección de facturación</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Calle, Ciudad, Código Postal"
                      value={billingAddress}
                      onChange={(e) => {
                        setBillingAddress(e.target.value)
                        if (errors.billingAddress) {
                          setErrors({ ...errors, billingAddress: "" })
                        }
                      }}
                      className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.billingAddress ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    <Home className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />
                  </div>
                  {errors.billingAddress && <p className="text-red-500 text-sm mt-1">{errors.billingAddress}</p>}
                </div>

                {/* Buy Button */}
                <Button
                  type="submit"
                  disabled={paymentStatus === "processing"}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {paymentStatus === "processing" ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      PROCESANDO...
                    </span>
                  ) : (
                    `COMPLETAR COMPRA - $${total.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD`
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Al completar la compra, aceptas nuestros términos y condiciones
                </p>
              </div>
            </div>
          </form>
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
