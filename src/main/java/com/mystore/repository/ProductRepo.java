package com.mystore.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mystore.domain.Product;

@Repository
public interface ProductRepo extends PagingAndSortingRepository<Product, Long> {

    @Query("FROM Product b WHERE b.p_name LIKE %:searchText% OR b.articul LIKE %:searchText% OR b.p_type LIKE %:searchText% ORDER BY b.price ASC")
    Page<Product> findAllProducts(Pageable pageable, @Param("searchText") String searchText);
}
