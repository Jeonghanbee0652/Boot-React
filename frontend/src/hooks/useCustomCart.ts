import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCartItemsAsync, postChangeCartAsync } from "../slices/cartSlice"
import type { AppDispatch, RootState } from "../store"
import useCustomLogin from "./useCustomLogin"

function useCustomCart() {
  const { loginState, loginStatus } = useCustomLogin()
  const cartItems = useSelector((state: RootState) => state.cartSlice)
  const dispatch = useDispatch<AppDispatch>()

  // 로그인되어 있으면 서버에서 장바구니 목록을 가져옴
  useEffect(() => {
    if (loginStatus) {
      dispatch(getCartItemsAsync())
    }
  }, [loginStatus])

  // 장바구니 추가/수량 변경 (amount : +1, -1, 또는 -수량(삭제))
  const changeCart = (cino: number | null, pno: number, amount: number) => {
    const email = loginState.email
    let qty = 1

    if (cino) {
      const targetArr = cartItems.items.filter(item => item.cino === cino)
      if (targetArr.length > 0) {
        qty = targetArr[0].qty + amount
      }
    }

    const requestItem: CartItemRequest = cino ? { email, cino, pno, qty } : { email, pno, qty }
    console.log(requestItem)

    dispatch(postChangeCartAsync(requestItem))
  }

  return { loginState, loginStatus, cartItems, changeCart }
}

export default useCustomCart