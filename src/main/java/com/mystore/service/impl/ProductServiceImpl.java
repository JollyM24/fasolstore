package com.mystore.service.impl;

import java.util.Collection;
import java.util.Optional;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.mystore.domain.Product;
import com.mystore.repository.ProductRepo;
import com.mystore.service.IPageService;
import com.mystore.service.IService;

@Service
public class ProductServiceImpl implements IService<Product>, IPageService<Product> {

	@Autowired
	private ProductRepo productRepo;
	
	@Override
	public Collection<Product> findAll() {
		return (Collection<Product>) productRepo.findAll();
	}

	@Override
	public Page<Product> findAll(Pageable pageable, String searchText) {
		return productRepo.findAllProducts(pageable, searchText);
	}

	@Override
	public Page<Product> findAll(Pageable pageable) {
		return productRepo.findAll(pageable);
	}

	@Override
	public Optional<Product> findById(Long id) {
		return productRepo.findById(id);
	}

	@Override
	public Product saveOrUpdate(Product product) {
		return productRepo.save(product);
	}

	@Override
	public String deleteById(Long id) {
		JSONObject jsonObject = new JSONObject();
		try {
			productRepo.deleteById(id);
			jsonObject.put("message", "product deleted successfully");
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return jsonObject.toString();
	}
}
