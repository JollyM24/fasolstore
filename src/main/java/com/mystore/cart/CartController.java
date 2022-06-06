package com.mystore.cart;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("rest/cart/")
@CrossOrigin(origins = "*")
public class CartController {
    private final  CartService cartService;
    @PostMapping("single")
    String addToCart(@RequestBody OrderRequestBody orderRequestBody){
        System.out.println("here");
        return cartService.addToCart(orderRequestBody);
    }

    @PostMapping("all")
    String addToCartMultiple(@RequestBody List<OrderRequestBody> orders){
        return cartService.addToCartMultiple(orders);
    }
    @GetMapping()
    List<OrderEntity> findOrderedProducts(){
        return cartService.findOrderedProducts();
    }
}