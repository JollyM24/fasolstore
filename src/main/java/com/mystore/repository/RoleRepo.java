package com.mystore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mystore.domain.Role;

@Repository
public interface RoleRepo extends JpaRepository<Role, Long> {

	@Query("FROM Role WHERE name=:name")
	Role findByName(@Param("name") String name);
}