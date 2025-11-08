import { jsPDF } from "jspdf"

interface InvoiceItem {
  id: string
  name: string
  quantity: number
  price: number
  color?: string
  size?: string
}

interface InvoiceData {
  orderNumber: string
  date: string
  customerEmail: string
  customerName: string
  billingAddress: string
  items: InvoiceItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
}

export async function generateInvoicePDF(data: InvoiceData): Promise<Buffer> {
  // Create new PDF document
  const doc = new jsPDF()

  console.log("[v0] Starting invoice pdf")


  // Set font
  doc.setFont("helvetica")

  // Header - Company Info
  doc.setFontSize(24)
  doc.setFont("helvetica", "bold")
  doc.text("ADVENTURE WORKS", 20, 20)

  doc.setFontSize(9)
  doc.setFont("helvetica", "normal")
  doc.text("Calle Principal #123, San Salvador, El Salvador", 20, 28)
  doc.text("Tel: +503 2222-3333 | Email: ventas@adventureworks.com", 20, 33)
  doc.text("NIT: 0614-123456-001-7", 20, 38)

  // Invoice Title
  doc.setFontSize(20)
  doc.setFont("helvetica", "bold")
  doc.text("FACTURA ELECTRÓNICA", 20, 50)
  
  console.log("[v0] title part")

  doc.setFontSize(11)
  doc.setFont("helvetica", "normal")
  doc.text(`Número de Orden: ${data.orderNumber}`, 20, 58)
  doc.text(`Fecha: ${data.date}`, 20, 64)

  // Line separator
  doc.setLineWidth(0.5)
  doc.line(20, 70, 190, 70)

  console.log("[v0] 2 part")

  // Customer Information
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text("INFORMACIÓN DEL CLIENTE", 20, 78)

  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text(`Nombre: ${data.customerName}`, 20, 86)
  doc.text(`Email: ${data.customerEmail}`, 20, 92)

  // Split address if too long
  const addressLines = doc.splitTextToSize(`Dirección: ${data.billingAddress}`, 170)
  doc.text(addressLines, 20, 98)

  console.log("[v0] 3 part")

  // Products Table
  let yPosition = 98 + addressLines.length * 6 + 8
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text("DETALLE DE PRODUCTOS", 20, yPosition)

  yPosition += 8

  // Table Header
  doc.setFontSize(10)
  doc.setFont("helvetica", "bold")
  doc.text("Producto", 20, yPosition)
  doc.text("Cant.", 110, yPosition)
  doc.text("Precio Unit.", 135, yPosition)
  doc.text("Total", 170, yPosition)
  console.log("[v0] 4 part")

  yPosition += 2
  doc.line(20, yPosition, 190, yPosition)
  yPosition += 6

  // Table Rows
  doc.setFont("helvetica", "normal")
  data.items.forEach((item) => {
    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage()
      yPosition = 20
    }

    // Product name (truncate if too long)
    const productName = item.name.length > 35 ? item.name.substring(0, 32) + "..." : item.name
    doc.text(productName, 20, yPosition)

    console.log("[v0] 6.1 part")
    // Details (color/size)
    if (item.color || item.size) {
      const details = []
      if (item.color) details.push(`Color: ${item.color}`)
      if (item.size) details.push(`Tamaño: ${item.size}`)
      doc.setFontSize(8)
      doc.setTextColor(100, 100, 100)
      doc.text(details.join(", "), 20, yPosition + 4)
      doc.setFontSize(10)
      doc.setTextColor(0, 0, 0)
    }

    console.log("[v0] 6.2 part")
    doc.text(item.quantity.toString(), 110, yPosition)
    doc.text(`$${item.price.toFixed(2)}`, 135, yPosition)
    doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 170, yPosition)

    console.log("[v0] 6.3 part")

    yPosition += item.color || item.size ? 12 : 8
  })
  console.log("[v0] 6 END part", data.subtotal, "----", data)

const subtotal = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
const shipping = data.shipping ?? 0
const tax = data.tax ?? 0
const total = subtotal + shipping + tax

 console.log("[v0] End new data", subtotal, shipping, tax, total)

  // Line before totals
  yPosition += 4
  doc.line(20, yPosition, 190, yPosition)
  yPosition += 8

  // Totals
  doc.setFont("helvetica", "normal")
  doc.text("Subtotal:", 135, yPosition)
  doc.text(`$${(subtotal || 0).toFixed(2)} USD`, 170, yPosition)

  console.log("[v0] 7.1 part")

  yPosition += 6
  doc.text("Envío:", 135, yPosition)
  doc.text(shipping === 0 ? "GRATIS" : `$${(shipping || 0).toFixed(2)} USD`, 170, yPosition)
  console.log("[v0] 7.2 part")


  yPosition += 6
  doc.text("Impuestos:", 135, yPosition)
  doc.text(`$${(tax || 0).toFixed(2)} USD`, 170, yPosition)

  console.log("[v0] 7.3 part")

  // Grand Total
  yPosition += 8
  doc.setLineWidth(0.5)
  doc.line(130, yPosition, 190, yPosition)
  yPosition += 6

  console.log("[v0] 7.10 part")

  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.text("TOTAL:", 135, yPosition)
  doc.text(`$${total.toFixed(2)} USD`, 170, yPosition)

  // Footer
  doc.setFontSize(8)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(150, 150, 150)
  doc.text("Gracias por su compra en Adventure Works", 105, 280, { align: "center" })
  doc.text("Este documento es una factura electrónica válida según la legislación de El Salvador", 105, 285, {
    align: "center",
  })

  console.log("[v0] 8 part")

  // Convert to buffer
  const pdfOutput = doc.output("arraybuffer")
  return Buffer.from(pdfOutput)
}
