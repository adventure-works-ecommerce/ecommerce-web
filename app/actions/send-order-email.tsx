"use server"

import { Resend } from "resend"
import { createClient } from "@/lib/supabase/server"
import { generateInvoicePDF } from "@/lib/generate-invoice-pdf"

const resend = new Resend(process.env.RESEND_API_KEY)

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  color?: string
  size?: string
}

interface OrderEmailData {
  items: CartItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  billingAddress: string
}

export async function sendOrderEmail(orderData: OrderEmailData) {
  try {
    console.log("[v0] Starting email send process")

    // Get authenticated user
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      throw new Error("User not authenticated")
    }

    const customerName = user.user_metadata?.name || user.email?.split("@")[0] || "Cliente"
    const customerEmail = user.email || ""

    console.log("[v0] User data:", { customerName, customerEmail })

    // Generate order number
    const orderNumber = `AW-${Date.now()}`
    const orderDate = new Date().toLocaleDateString("es-SV", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    // Prepare invoice data
    const invoiceData = {
      orderNumber,
      date: orderDate,
      customerEmail,
      customerName,
      billingAddress: orderData.billingAddress,
      items: orderData.items,
      subtotal: orderData.subtotal,
      shipping: orderData.shipping,
      tax: orderData.tax,
      total: orderData.total,
    }

    console.log("[v0] Generating PDF invoice", invoiceData)
    const pdfBuffer = await generateInvoicePDF(invoiceData)
    console.log("[v0] Buffer generated")


    // Generate JSON invoice
    const jsonInvoice = {
      empresa: {
        nombre: "Adventure Works",
        direccion: "Calle Principal #123, San Salvador, El Salvador",
        telefono: "+503 2222-3333",
        email: "ventas@adventureworks.com",
        nit: "0614-123456-001-7",
      },
      factura: {
        numero: orderNumber,
        fecha: orderDate,
        tipo: "Factura Electrónica",
      },
      cliente: {
        nombre: customerName,
        email: customerEmail,
        direccion: orderData.billingAddress,
      },
      productos: orderData.items.map((item) => ({
        id: item.id,
        nombre: item.name,
        cantidad: item.quantity,
        precioUnitario: item.price,
        total: item.price * item.quantity,
        ...(item.color && { color: item.color }),
        ...(item.size && { tamaño: item.size }),
      })),
      totales: {
        subtotal: orderData.subtotal,
        envio: orderData.shipping,
        impuestos: orderData.tax,
        total: orderData.total,
        moneda: "USD",
      },
    }

    // Send email with Resend
    console.log("[v0] Sending email with attachments")
    const newSubtotal = orderData.items.reduce((s, i) => s + i.price * i.quantity, 0)
    console.log("newSubtotal", newSubtotal, "orderData", orderData)
    orderData.shipping ??= 0
    orderData.tax ??= 0
    orderData.total ??= orderData.subtotal + orderData.shipping + orderData.tax


    const { data, error } = await resend.emails.send({
      from: "Adventure Works <onboarding@resend.dev>",
      to: [customerEmail],
      subject: `Factura Electrónica - Orden ${orderNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .item { border-bottom: 1px solid #eee; padding: 15px 0; }
              .item:last-child { border-bottom: none; }
              .totals { background: #667eea; color: white; padding: 20px; border-radius: 8px; margin-top: 20px; }
              .total-row { display: flex; justify-content: space-between; margin: 10px 0; }
              .grand-total { font-size: 1.3em; font-weight: bold; border-top: 2px solid white; padding-top: 15px; margin-top: 15px; }
              .footer { text-align: center; color: #666; margin-top: 30px; font-size: 0.9em; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">ADVENTURE WORKS</h1>
                <p style="margin: 10px 0 0 0;">Factura Electrónica</p>
              </div>
              
              <div class="content">
                <h2>¡Gracias por tu compra, ${customerName}!</h2>
                <p>Tu pedido ha sido procesado exitosamente. Adjunto encontrarás tu factura electrónica en formato PDF y JSON.</p>
                
                <div class="order-details">
                  <p><strong>Número de Orden:</strong> ${orderNumber}</p>
                  <p><strong>Fecha:</strong> ${orderDate}</p>
                  <p><strong>Dirección de Envío:</strong> ${orderData.billingAddress}</p>
                  
                  <h3>Productos:</h3>
                  ${orderData.items
                    .map(
                      (item) => `
                    <div class="item">
                      <strong>${item.name}</strong><br>
                      Cantidad: ${item.quantity} × $${item.price.toFixed(2)} = $${(item.price * item.quantity).toFixed(2)}
                      ${item.color ? `<br>Color: ${item.color}` : ""}
                      ${item.size ? `<br>Tamaño: ${item.size}` : ""}
                    </div>
                  `,
                    )
                    .join("")}
                </div>
                
                <div class="totals">
                  <div class="total-row">
                    <span>Subtotal:</span>
                    <span>$${(newSubtotal || 0).toFixed(2)} USD</span>
                  </div>
                  <div class="total-row">
                    <span>Envío:</span>
                    <span>${orderData.shipping === 0 ? "GRATIS" : `$${(orderData.shipping || 0).toFixed(2)} USD`}</span>
                  </div>
                  <div class="total-row">
                    <span>Impuestos:</span>
                    <span>$${(orderData.tax || 0).toFixed(2)} USD</span>
                  </div>
                  <div class="total-row grand-total">
                    <span>TOTAL:</span>
                    <span>$${(orderData.total || 0).toFixed(2)} USD</span>
                  </div>
                </div>
                
                <p style="margin-top: 30px;">Tu pedido será procesado y enviado en los próximos 2-3 días hábiles.</p>
                
                <div class="footer">
                  <p>Este es un documento fiscal válido según la legislación de El Salvador</p>
                  <p>Adventure Works | Calle Principal #123, San Salvador<br>
                  Tel: +503 2222-3333 | NIT: 0614-123456-001-7</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      attachments: [
        {
          filename: `factura-${orderNumber}.pdf`,
          content: pdfBuffer,
        },
        {
          filename: `factura-${orderNumber}.json`,
          content: Buffer.from(JSON.stringify(jsonInvoice, null, 2)),
        },
      ],
    })
    
    console.log("[v0] Finally email with attachments")

    if (error) {
      console.error("[v0] Resend error:", error)
      throw error
    }

    console.log("[v0] Email sent successfully:", data)
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Error sending email:", error)
    throw error
  }
}
