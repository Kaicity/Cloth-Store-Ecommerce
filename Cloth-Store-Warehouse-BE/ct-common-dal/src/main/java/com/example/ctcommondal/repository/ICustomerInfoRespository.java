package com.example.ctcommondal.repository;

import com.example.ctcommondal.entity.CustomerInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICustomerInfoRespository extends JpaRepository<CustomerInfoEntity, String> {

}
