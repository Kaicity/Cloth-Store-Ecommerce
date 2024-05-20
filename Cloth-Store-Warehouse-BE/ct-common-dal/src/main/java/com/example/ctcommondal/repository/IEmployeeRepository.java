package com.example.ctcommondal.repository;

import com.example.ctcommondal.entity.CustomerEntity;
import com.example.ctcommondal.entity.EmployeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IEmployeeRepository extends JpaRepository<EmployeeEntity, String> {
    @Query("SELECT e FROM EmployeeEntity e WHERE e.email = :email")
    Optional<EmployeeEntity> findCustomerByEmail(@Param("email") String email);
}
