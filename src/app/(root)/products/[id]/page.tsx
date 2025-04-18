import ProductDetailPage from "@/components/product/product-detail-page"
import { getProductsById } from "@/api/products"
import { Product } from "@/types";



interface ProductPageProps {
  params?: {
    id: string | number;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {


    const product = await getProductsById(Number(params?.id))

    console.log("Product detail page: ", product);
    

    if (!product) return <div>Product Not Found</div>

    return <ProductDetailPage product={product} />
}
