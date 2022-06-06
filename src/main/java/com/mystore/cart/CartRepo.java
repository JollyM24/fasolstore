package com.mystore.cart;

import com.mystore.domain.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepo extends JpaRepository<ShoppingCart, Long> {
    Optional<ShoppingCart> findByUser(User user);

    //    @Query(nativeQuery = true, value = "SELECT * FROM ShoppingCart s WHERE s.user= :user DESC LIMIT :cnt")
    List<ShoppingCart> findAllByUser(User user);
    List<ShoppingCart> findAllByUser(User user, Pageable pageable);

}