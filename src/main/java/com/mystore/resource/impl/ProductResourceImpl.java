package com.mystore.resource.impl;

import java.util.Arrays;
import java.util.Set;
import java.util.TreeSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mystore.domain.Product;
import com.mystore.resource.Resource;
import com.mystore.service.IPageService;
import com.mystore.service.IService;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins="http://localhost:3000")
public class ProductResourceImpl implements Resource<Product> {
	
	@Autowired
	private IService<Product> productService;
	
	@Autowired
	private IPageService<Product> productPageService;

	@Override
	public ResponseEntity<Page<Product>> findAll(Pageable pageable, String searchText) {
		return new ResponseEntity<>(productPageService.findAll(pageable, searchText), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Page<Product>> findAll(int pageNumber, int pageSize, String sortBy, String sortDir) {
		return new ResponseEntity<>(productPageService.findAll(
				PageRequest.of(
						pageNumber, pageSize,
						sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending()
				)
		), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Product> findById(Long id) {
		return new ResponseEntity<>(productService.findById(id).get(), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Product> save(Product product) {
		return new ResponseEntity<>(productService.saveOrUpdate(product), HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<Product> update(Product product) {
		return new ResponseEntity<>(productService.saveOrUpdate(product), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<String> deleteById(Long id) {
		return new ResponseEntity<>(productService.deleteById(id), HttpStatus.OK);
	}

	@GetMapping("/types")
	public  ResponseEntity<Set<String>> findAllP_types() {
        return new ResponseEntity<>(new TreeSet<>(Arrays.asList("Guitar", "Drums", "Keyboard", "Violin", "Saxophone", "Tuba")), HttpStatus.OK);
    }
}
