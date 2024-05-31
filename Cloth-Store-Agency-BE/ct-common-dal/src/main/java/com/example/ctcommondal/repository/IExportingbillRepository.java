package com.example.ctcommondal.repository;

import com.example.ctcommondal.entity.ExportbillEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IExportingbillRepository extends JpaRepository<ExportbillEntity, String> {

    @Query("select e from ExportbillEntity e ")
    List<ExportbillEntity> getAllBill();

    @Query("SELECT i FROM ExportbillEntity i WHERE i.id = :id ")
    ExportbillEntity findImportingById(@Param("id") String id);

    @Query("SELECT c FROM ExportbillEntity c WHERE c.id in :ids  ")
    List<ExportbillEntity> findAllExportingIds(@Param("ids") List<String> ids);

    @Query("select c from ExportbillEntity c where c.customerId in :customer_id")
    List<ExportbillEntity> findExportingBillByCustomerId(@Param("customer_id") String customer_id);

}
