package com.mystore.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "tbl_user")
public class User {
	@Id
	@GeneratedValue
	private Long id;
	@Column(nullable = false)
	private String name;
	@Column(nullable = false)
	private String email;
	@Column(nullable = false)
	private String mobile;
	@Column(nullable = false)
	private String password;
	@ManyToOne
	@JoinColumn(name = "role_id")
	private Role role;

	@ManyToMany(cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
	@JoinTable(name = "u_prodlist", joinColumns = @JoinColumn(name = "u_id"), inverseJoinColumns = @JoinColumn(name = "p_id"))
	private List<Product> prodList;

}