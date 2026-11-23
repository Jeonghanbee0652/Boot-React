import useCustomCart from "../../hooks/useCustomCart";
import CartItemComponent from "../cart/cartItemComponent";

const CartComponent = () => {
  const { loginState, loginStatus, cartItems, changeCart } = useCustomCart()

  const total = cartItems.items.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <div className="w-full">
      {!loginStatus && <div className="text-2xl">Sidebar</div>}

      {loginStatus &&
        <>
          <div className="flex items-center">
            <div className="font-bold">{loginState.nickname}님 Cart</div>
            <div className="bg-orange-600 text-center text-white font-bold w-8 rounded-full m-1">
              {cartItems.items.length}
            </div>
          </div>
          {cartItems.status === 'pending' && <div>Loading....</div>}
          <ul>
            {cartItems.items.map((item: CartItemResponse) =>
              <CartItemComponent key={item.cino} cartItem={item} changeCart={changeCart} />
            )}
          </ul>
          <div className="text-right font-extrabold text-xl m-2">
            TOTAL: {total} 원
          </div>
        </>
      }
    </div>
  );
}

export default CartComponent;