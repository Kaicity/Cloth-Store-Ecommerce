package com.example.ctcommondal.dao;

import com.example.ctcommondal.entity.ProductEntity;

import java.util.List;
import java.util.Map;

public interface IProductDao {
    List<ProductEntity> productAdvanceSearch(Map<String, Object> search);
}
