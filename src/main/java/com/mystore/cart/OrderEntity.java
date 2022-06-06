package com.mystore.cart;

import com.mystore.domain.Product;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "tbl_orderentity")
public class OrderEntity {
    @Id
    private Long id;
    private int quantity;

    @OneToOne
    private Product product;

    public OrderEntity(int quantity, Product product) {
        this.quantity = quantity;
        this.product = product;
    }
}
