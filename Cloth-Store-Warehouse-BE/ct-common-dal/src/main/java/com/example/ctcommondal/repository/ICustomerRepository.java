package com.example.ctcommondal.repository;

import com.example.ctcommondal.entity.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ICustomerRepository extends JpaRepository<CustomerEntity, String> {
    @Query("SELECT c FROM CustomerEntity c WHERE c.phone = :phone AND c.password = :password")
    Optional<CustomerEntity> findOneByUsernameAndPassword(@Param("phone") String phone, @Param("password") String password);
    @Query("SELECT c FROM CustomerEntity c WHERE c.id = :id")
    CustomerEntity  findCustomerDTOById(@Param("id") String id);
    Optional<CustomerEntity> findByPhone(String phone);
    @Query("SELECT c FROM CustomerEntity c WHERE c.eid = :id")
    CustomerEntity  findCustomerDTOBycode(@Param("id") String id);
}
