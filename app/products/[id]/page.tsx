import { notFound } from "next/navigation"
import { getProductById } from "@/lib/products-data"
import ProductDetail from "@/components/product-detail"

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} />
}
