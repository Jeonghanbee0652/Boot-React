import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { getList } from "../../api/productsApi";
import ListComponent from "../../components/products/listComponent";

// 라우팅될 때 목록 데이터를 미리 불러옴 (loader)
export async function loadProducts({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const page = url.searchParams.get('page') || "1"
  const size = url.searchParams.get('size') || "10"

  return await getList({ page, size })
}

const ListPage = () => {
  const pageResponse = useLoaderData() as PageResponseDTO<ProductDTO>
  console.log(pageResponse)

  return (
    <div className="w-full mt-4 border border-solid border-neutral-300 shadow-md">
      <div className="text-2xl m-4 font-extrabold">
        Products List Page
      </div>
      <ListComponent serverData={pageResponse} />
    </div>
  );
}

export default ListPage;