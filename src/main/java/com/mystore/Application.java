package com.mystore;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.mystore.domain.Product;
import com.mystore.domain.Role;
import com.mystore.domain.User;
import com.mystore.service.IRoleService;
import com.mystore.service.IService;
import com.mystore.utils.ConstantUtils;

@SpringBootApplication
public class Application implements CommandLineRunner {
	@Autowired
	private IService<User> userService;

	@Autowired
	private IRoleService<Role> roleService;

	@Autowired
	private IService<Product> productService;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		if (roleService.findAll().isEmpty()) {
			roleService.saveOrUpdate(new Role(ConstantUtils.ADMIN.toString()));
			roleService.saveOrUpdate(new Role(ConstantUtils.USER.toString()));
		}
	};
}
