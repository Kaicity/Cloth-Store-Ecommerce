package com.example.ctapi.services;

import com.example.ctapi.dtos.Response.SupplierDto;
import com.example.ctapi.dtos.Response.SupplierSearchDto;

import java.util.List;

public interface ISupplierService {
    void CreateSupplier(SupplierDto supplier);

    void deleteSupplierById(String id);

    void updateSupplier(SupplierDto supplier);

    List<SupplierDto> getSupplierByIds(List<String> ids);

    SupplierSearchDto getAllSupplierBaseSearch();

    SupplierSearchDto searchAdvance(SupplierSearchDto searchDto);
}
