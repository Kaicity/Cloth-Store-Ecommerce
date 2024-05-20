package com.example.ctcommondal.dao;

import com.example.ctcommondal.entity.SupplierEntity;

import java.util.List;
import java.util.Map;

public interface ISupplierDao {
    List<SupplierEntity> supplierAdvanceSearch(Map<String, Object> search);
}
