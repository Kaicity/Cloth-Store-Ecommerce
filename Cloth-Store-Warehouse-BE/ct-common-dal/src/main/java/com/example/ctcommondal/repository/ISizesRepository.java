package com.example.ctcommondal.repository;

import com.example.ctcommondal.entity.SizesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ISizesRepository extends JpaRepository<SizesEntity, String> {
    @Query("SELECT s FROM SizesEntity s WHERE s.productId in :productIDs ")
    List<SizesEntity> findAllColorsbyProductIds(@Param("productIDs")  List<String>productIDs);

    @Query("SELECT s FROM SizesEntity s WHERE s.productId in :productId ")
    List<SizesEntity> findAllColorsbyProductId(@Param("productId") String productId);
}
