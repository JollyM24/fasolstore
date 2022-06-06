package com.mystore.cart;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderEntityRepo extends JpaRepository<OrderEntity, Long> {
}
