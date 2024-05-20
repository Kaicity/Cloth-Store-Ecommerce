package com.example.ctapi.dtos.Response;

import com.example.ctapi.dtos.request.BaseSearchDto;
import lombok.Data;

import java.util.List;

@Data
public class SupplierSearchDto extends BaseSearchDto<List<SupplierDto>> {
    String idCompany;
    String status;
    String code;
    String name;
    String phone;
}
