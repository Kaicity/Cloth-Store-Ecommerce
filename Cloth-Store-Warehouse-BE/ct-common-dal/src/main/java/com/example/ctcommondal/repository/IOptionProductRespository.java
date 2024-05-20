package com.example.ctcommondal.repository;

import com.example.ctcommon.enums.TypeOptionProduct;
import com.example.ctcommondal.entity.OptionProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IOptionProductRespository extends JpaRepository<OptionProductEntity, String> {
    @Query("SELECT o FROM OptionProductEntity o WHERE o.type = :type")
    List<OptionProductEntity> findAllOptionType(@Param("type") TypeOptionProduct type);
}
