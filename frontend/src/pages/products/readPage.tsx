import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { getOne } from "../../api/productsApi";
import ReadComponent from "../../components/products/readComponent";

// 상품 번호로 상품 하나를 미리 불러옴 (loader) - 수정 화면에서도 같이 사용
export async function loadProduct({ params }: LoaderFunctionArgs) {
  const { pno } = params
  return await getOne(pno as string)
}

function ReadPage() {
  const product = useLoaderData() as ProductDTO

  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">
        Products Read Page
      </div>
      <ReadComponent product={product} />
    </div>
  )
}

export default ReadPage