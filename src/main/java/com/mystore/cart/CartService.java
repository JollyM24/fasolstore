package com.mystore.cart;

import com.mystore.domain.Product;
import com.mystore.domain.User;
import com.mystore.service.impl.ProductServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CartService {
    private final CartRepo cartRepo;
    private final ProductServiceImpl productService;
    private final OrderEntityRepo orderEntityRepo;

    @Transactional
    public String addToCart(OrderRequestBody orderRequestBody) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();
        Optional<ShoppingCart> shoppingCartcheck = cartRepo.findByUser(user);

        ShoppingCart shoppingCart;
        if(!shoppingCartcheck.isPresent()) {
            shoppingCart = new ShoppingCart(user);
            cartRepo.save(shoppingCart);
        }else {
            shoppingCart = shoppingCartcheck.get();
        }

        Optional<Product> product = productService.findById(orderRequestBody.getId());
        if(!product.isPresent()){
            throw new IllegalStateException("product id error/not found");
        }

        OrderEntity orderEntity = new OrderEntity(orderRequestBody.getNum(), product.get());
        orderEntityRepo.save(orderEntity);
        shoppingCart.getProducts().add(orderEntity);
        return "Done";
    }

    @Transactional
    public String addToCartMultiple(List<OrderRequestBody> orders) {
        for(OrderRequestBody body: orders){
            this.addToCart(body);
        }
        return "Done";
    }

    List<OrderEntity> findOrderedProducts(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();
//        Pageable topfive = PageRequest.of(0,5);
//        return  cartRepository.findAllByUserInfoLimitK(user, 5);
        List<ShoppingCart> shoppingCarts = cartRepo.findAllByUser(user);
        List<OrderEntity> products = new ArrayList<OrderEntity>();
        for(int i = shoppingCarts.size()-1;i>=0;i--){
            products.addAll(shoppingCarts.get(i).getProducts());
        }
        return products;
    }
}
