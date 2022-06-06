package com.mystore.cart;

import com.mystore.domain.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "tbl_cart")
public class ShoppingCart {
    @Id
    private Long id;

    @OneToOne
    @JoinColumn(
            nullable = false,
            name = "user_id"
    )
    private User user;

    @OneToMany
    private List<OrderEntity> products = new ArrayList<OrderEntity>();

    public ShoppingCart(User user) {
        this.user = user;
    }
}
