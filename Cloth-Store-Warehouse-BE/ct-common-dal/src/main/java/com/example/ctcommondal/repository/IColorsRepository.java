package com.example.ctcommondal.repository;

import com.example.ctcommondal.entity.ColorsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IColorsRepository extends JpaRepository<ColorsEntity, String> {
    @Query("SELECT c FROM ColorsEntity c WHERE c.productId in :ids  ")
    List<ColorsEntity> findAllColorsByProductIds(@Param("ids") List<String> ids);

    @Query("SELECT c FROM ColorsEntity c WHERE c.productId in :productId")
    List<ColorsEntity> findAllColorsByProductId(@Param("productId") String productId);
}
