import { imageUrl } from "../../api/productsApi";
import useCustomCart from "../../hooks/useCustomCart";
import useCustomMove from "../../hooks/useCustomMove";

function ReadComponent({ product }: { product: ProductDTO }) {
  const { moveToModify, moveToList } = useCustomMove()
  const { changeCart, cartItems } = useCustomCart()

  // 장바구니에 담기 (이미 담긴 상품이면 수량 +1)
  const handleClickAddCart = () => {
    const addedItem = cartItems.items.filter(item => item.pno === product.pno)[0]

    if (addedItem) {
      if (window.confirm("이미 추가된 상품입니다. 추가하시겠습니까?") === false) {
        return
      }
      changeCart(addedItem.cino, product.pno, 1)
    } else {
      changeCart(null, product.pno, 1)
    }
  }

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4 bg-white">
      {makeDiv('PNO', product.pno)}
      {makeDiv('PNAME', product.pname)}
      {makeDiv('PRICE', product.price)}
      {makeDiv('PDESC', product.pdesc)}

      <div className="w-full justify-center flex flex-col m-auto items-center">
        {product.uploadFileNames.map((imgFile, i) =>
          <img alt="product" key={i} className="p-4 w-1/2" src={imageUrl(imgFile)} />
        )}
      </div>

      <div className="flex justify-end p-4">
        <button type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-green-500"
          onClick={handleClickAddCart}>
          Add Cart
        </button>
        <button type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={() => moveToModify(product.pno)}>
          Modify
        </button>
        <button type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={() => moveToList()}>
          List
        </button>
      </div>
    </div>
  )
}

const makeDiv = (title: string, value: string | number) =>
  <div className="flex justify-center">
    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
      <div className="w-1/5 p-6 text-right font-bold">{title}</div>
      <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{value}</div>
    </div>
  </div>

export default ReadComponent;