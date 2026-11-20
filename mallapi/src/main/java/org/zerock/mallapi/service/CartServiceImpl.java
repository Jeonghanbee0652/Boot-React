package org.zerock.mallapi.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.zerock.mallapi.domain.Cart;
import org.zerock.mallapi.domain.CartItem;
import org.zerock.mallapi.domain.Member;
import org.zerock.mallapi.domain.Product;
import org.zerock.mallapi.dto.CartItemDTO;
import org.zerock.mallapi.dto.CartItemListDTO;
import org.zerock.mallapi.repository.CartItemRepository;
import org.zerock.mallapi.repository.CartRepository;
import org.zerock.mallapi.repository.MemberRepository;
import org.zerock.mallapi.repository.ProductRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RequiredArgsConstructor
@Service
@Log4j2
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;

    private final CartItemRepository cartItemRepository;

    private final MemberRepository memberRepository;

    private final ProductRepository productRepository;

    @Override
    public List<CartItemListDTO> addOrModify(CartItemDTO cartItemDTO) {

        String email = cartItemDTO.getEmail();
        Long pno = cartItemDTO.getPno();
        int qty = cartItemDTO.getQty();
        Long cino = cartItemDTO.getCino();

        // 장바구니 아이템 번호가 있어서 수량만 변경하는 경우
        if (cino != null) {
            Optional<CartItem> cartItemResult = cartItemRepository.findById(cino);
            CartItem cartItem = cartItemResult.orElseThrow();
            cartItem.changeQty(qty);
            cartItemRepository.save(cartItem);
            return getCartItems(email);
        }

        // 장바구니 아이템 번호(cino)가 없는 경우 : 사용자의 카트
        Cart cart = getCart(email);

        // 이미 동일한 상품이 담긴 적이 있을 수 있으므로
        CartItem cartItem = cartItemRepository.getItemOfPno(email, pno);

        if (cartItem == null) {
            Product product = productRepository.getReferenceById(pno);
            cartItem = CartItem.builder().product(product).cart(cart).qty(qty).build();
        } else {
            cartItem.changeQty(qty);
        }

        // 상품 아이템 저장
        cartItemRepository.save(cartItem);

        return getCartItems(email);
    }

    // 사용자의 장바구니가 없었다면 새로운 장바구니를 생성하고 반환
    private Cart getCart(String email) {

        Optional<Cart> result = cartRepository.getCartOfMember(email);

        if (result.isPresent()) {
            return result.get();
        }

        log.info("Cart of the member is not exist!!");

        Member member = memberRepository.getReferenceById(email);
        Cart tempCart = Cart.builder().owner(member).build();

        return cartRepository.save(tempCart);
    }

    @Override
    public List<CartItemListDTO> getCartItems(String email) {
        return cartItemRepository.getItemsOfCartDTOByEmail(email);
    }

    @Override
    public List<CartItemListDTO> remove(Long cino) {

        Long cno = cartItemRepository.getCartFromItem(cino);

        log.info("cart no: " + cno);

        cartItemRepository.deleteById(cino);

        return cartItemRepository.getItemsOfCartDTOByCart(cno);
    }
}