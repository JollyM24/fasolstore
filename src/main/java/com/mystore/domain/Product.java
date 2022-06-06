package com.mystore.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@Table(name = "tbl_product")
public class Product {

	@Id
	@GeneratedValue
	private Long id;

	@Column(nullable = false)
	private String p_name;

	@Column(nullable = false)
	private String articul;

	@Column(nullable = false)
	private String photoURL;

	@Column(nullable = false)
	private Double price;

	@Column(nullable = false)
	private String p_type;

}
