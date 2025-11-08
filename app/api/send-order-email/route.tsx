import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { orderNumber, total, items, billingAddress } = await request.json()

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user?.email) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    const userMetadata = user.user_metadata || {}
    const userName = userMetadata.name || "Cliente"
    const userDUI = userMetadata.dui || "N/A"
    const userPhone = userMetadata.phone || "N/A"

    const invoiceData = {
      factura: {
        numero: orderNumber,
        fecha: new Date().toISOString(),
        tipo: "Factura Electrónica",
      },
      empresa: {
        nombre: "Adventure Works Cycles",
        direccion: "Calle Principal #123, San Salvador, El Salvador",
        telefono: "+503 2222-3333",
        email: "ventas@adventureworks.com",
        nit: "0614-123456-001-7",
      },
      cliente: {
        nombre: userName,
        email: user.email,
        dui: userDUI,
        telefono: userPhone,
        direccion: billingAddress || "N/A",
      },
      productos: items.map((item: any) => ({
        id: item.id,
        nombre: item.name,
        descripcion: `${item.type || "Producto"} - Color: ${item.color}, Tamaño: ${item.size}`,
        cantidad: item.quantity,
        precioUnitario: item.price,
        subtotal: item.price * item.quantity,
      })),
      resumen: {
        subtotal: items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0),
        envio: 0.0,
        impuestos: 0.0,
        total: total,
        moneda: "USD",
      },
    }

    const invoiceJSON = JSON.stringify(invoiceData, null, 2)
    const invoiceBuffer = Buffer.from(invoiceJSON, "utf-8")

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1e40af; color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 20px; }
            .invoice-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
            .product-item { border-bottom: 1px solid #e5e7eb; padding: 10px 0; }
            .total { font-size: 24px; font-weight: bold; color: #1e40af; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>ADVENTURE WORKS</h1>
              <p>Factura Electrónica</p>
            </div>
            
            <div class="content">
              <h2>¡Gracias por tu compra, ${userName}!</h2>
              <p>Tu pedido ha sido procesado exitosamente. Adjuntamos tu factura electrónica en formato JSON.</p>
              
              <div class="invoice-box">
                <h3>Detalles del Pedido</h3>
                <p><strong>Número de Orden:</strong> ${orderNumber}</p>
                <p><strong>Fecha:</strong> ${new Date().toLocaleDateString("es-SV", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</p>
                
                <h4 style="margin-top: 20px;">Productos:</h4>
                ${items
                  .map(
                    (item: any) => `
                  <div class="product-item">
                    <strong>${item.name}</strong><br>
                    Color: ${item.color} | Tamaño: ${item.size}<br>
                    Cantidad: ${item.quantity} × $${item.price.toFixed(2)} = $${(item.price * item.quantity).toFixed(2)} USD
                  </div>
                `,
                  )
                  .join("")}
                
                <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #1e40af;">
                  <p class="total">Total: $${total.toFixed(2)} USD</p>
                </div>
              </div>
              
              <p><strong>Información de Envío:</strong></p>
              <p>Tu pedido será enviado en 3-5 días hábiles a la dirección proporcionada.</p>
              
              <p style="margin-top: 30px;">Si tienes alguna pregunta, no dudes en contactarnos.</p>
            </div>
            
            <div class="footer">
              <p>Adventure Works Cycles<br>
              Calle Principal #123, San Salvador, El Salvador<br>
              Tel: +503 2222-3333 | Email: ventas@adventureworks.com</p>
              <p>© 2025 Adventure Works. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
      </html>
    `

    const { data, error } = await resend.emails.send({
      from: "Adventure Works <onboarding@resend.dev>",
      to: [user.email],
      subject: `Factura Electrónica - Pedido ${orderNumber}`,
      html: htmlContent,
      attachments: [
        {
          filename: `factura-${orderNumber}.json`,
          content: invoiceBuffer,
        },
      ],
    })

    if (error) {
      console.error("[v0] Error sending email with Resend:", error)
      return NextResponse.json({ error: "Failed to send email", details: error }, { status: 500 })
    }

    console.log("[v0] Email sent successfully:", data)
    return NextResponse.json({ success: true, message: "Email sent successfully", emailId: data?.id })
  } catch (error) {
    console.error("[v0] Error in send-order-email route:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
