"use server"

import { Resend } from "resend"
import { generateInvoicePDF } from "@/lib/generate-invoice-pdf"

const resend = new Resend(process.env.RESEND_API_KEY)

interface PhysicalSaleItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface PhysicalSaleEmailData {
  orderNumber: string
  items: PhysicalSaleItem[]
  subtotal: number
  tax: number
  total: number
  customerName: string
  customerEmail: string
  customerAddress: string
  amountPaid: number
  change: number
}

export async function sendPhysicalSaleEmail(saleData: PhysicalSaleEmailData) {
  try {
    console.log("[v0] Starting physical sale email send process")

    const orderDate = new Date().toLocaleDateString("es-SV", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    // Prepare invoice data
    const invoiceData = {
      orderNumber: saleData.orderNumber,
      date: orderDate,
      customerEmail: saleData.customerEmail,
      customerName: saleData.customerName,
      billingAddress: saleData.customerAddress,
      items: saleData.items,
      subtotal: saleData.subtotal,
      shipping: 0,
      tax: saleData.tax,
      total: saleData.total,
    }

    console.log("[v0] Generating PDF invoice for physical sale", invoiceData)
    const pdfBuffer = await generateInvoicePDF(invoiceData)
    console.log("[v0] PDF Buffer generated")

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
        numero: saleData.orderNumber,
        fecha: orderDate,
        tipo: "Factura Electrónica - Venta Física",
      },
      cliente: {
        nombre: saleData.customerName,
        email: saleData.customerEmail,
        direccion: saleData.customerAddress,
      },
      productos: saleData.items.map((item) => ({
        id: item.id,
        nombre: item.name,
        cantidad: item.quantity,
        precioUnitario: item.price,
        total: item.price * item.quantity,
      })),
      totales: {
        subtotal: saleData.subtotal,
        impuestos: saleData.tax,
        total: saleData.total,
        montoPagado: saleData.amountPaid,
        cambio: saleData.change,
        moneda: "USD",
      },
      tipoVenta: "Venta en Tienda Física",
    }

    // Send email with Resend
    console.log("[v0] Sending physical sale email with attachments")

    const recipientEmail = saleData.customerEmail || "00067621@uca.edu.sv"

    console.log("[LOG] recipientEmail", recipientEmail)

    const { data, error } = await resend.emails.send({
      from: "Adventure Works <onboarding@resend.dev>",
      to: [recipientEmail],
      subject: `Factura Venta en Tienda - Orden ${saleData.orderNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .item { border-bottom: 1px solid #eee; padding: 15px 0; }
              .item:last-child { border-bottom: none; }
              .totals { background: #1e40af; color: white; padding: 20px; border-radius: 8px; margin-top: 20px; }
              .total-row { display: flex; justify-content: space-between; margin: 10px 0; }
              .grand-total { font-size: 1.3em; font-weight: bold; border-top: 2px solid white; padding-top: 15px; margin-top: 15px; }
              .payment-info { background: #10b981; color: white; padding: 20px; border-radius: 8px; margin-top: 20px; }
              .change-amount { font-size: 1.5em; font-weight: bold; margin-top: 10px; }
              .footer { text-align: center; color: #666; margin-top: 30px; font-size: 0.9em; }
              .badge { display: inline-block; background: #10b981; color: white; padding: 5px 15px; border-radius: 20px; font-size: 0.9em; margin-top: 10px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">ADVENTURE WORKS</h1>
                <p style="margin: 10px 0 0 0;">Factura Electrónica</p>
                <span class="badge">VENTA EN TIENDA</span>
              </div>
              
              <div class="content">
                <h2>¡Gracias por tu compra, ${saleData.customerName}!</h2>
                <p>Tu compra en nuestra tienda física ha sido procesada exitosamente.</p>
                
                <div class="order-details">
                  <p><strong>Número de Orden:</strong> ${saleData.orderNumber}</p>
                  <p><strong>Fecha:</strong> ${orderDate}</p>
                  <p><strong>Cliente:</strong> ${saleData.customerName}</p>
                  ${saleData.customerAddress ? `<p><strong>Dirección:</strong> ${saleData.customerAddress}</p>` : ""}
                  
                  <h3>Productos:</h3>
                  ${saleData.items
                    .map(
                      (item) => `
                    <div class="item">
                      <strong>${item.name}</strong><br>
                      Cantidad: ${item.quantity} × $${item.price.toFixed(2)} = $${(item.price * item.quantity).toFixed(2)}
                    </div>
                  `,
                    )
                    .join("")}
                </div>
                
                <div class="totals">
                  <div class="total-row">
                    <span>Subtotal:</span>
                    <span>$${saleData.subtotal.toFixed(2)} USD</span>
                  </div>
                  <div class="total-row">
                    <span>IVA (13%):</span>
                    <span>$${saleData.tax.toFixed(2)} USD</span>
                  </div>
                  <div class="total-row grand-total">
                    <span>TOTAL:</span>
                    <span>$${saleData.total.toFixed(2)} USD</span>
                  </div>
                </div>
                
                <div class="payment-info">
                  <div class="total-row">
                    <span>Monto Pagado:</span>
                    <span>$${saleData.amountPaid.toFixed(2)} USD</span>
                  </div>
                  <div class="total-row">
                    <span>Cambio:</span>
                    <span class="change-amount">$${saleData.change.toFixed(2)} USD</span>
                  </div>
                </div>
                
                <p style="margin-top: 30px;">Gracias por visitarnos. ¡Esperamos verte pronto!</p>
                
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
          filename: `factura-${saleData.orderNumber}.pdf`,
          content: pdfBuffer,
        },
        {
          filename: `factura-${saleData.orderNumber}.json`,
          content: Buffer.from(JSON.stringify(jsonInvoice, null, 2)),
        },
      ],
    })

    console.log("[v0] Physical sale email sent successfully")

    if (error) {
      console.error("[v0] Resend error:", error)
      throw error
    }

    console.log("[v0] Email sent successfully:", data)
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Error sending physical sale email:", error)
    throw error
  }
}
