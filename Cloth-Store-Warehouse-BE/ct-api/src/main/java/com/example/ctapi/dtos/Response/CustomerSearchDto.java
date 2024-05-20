package com.example.ctapi.dtos.Response;

import com.example.ctapi.dtos.request.BaseSearchDto;
import lombok.Data;

import java.util.List;

@Data
public class CustomerSearchDto extends BaseSearchDto<List<CustomerDto>> {
    String idCompany;
    String status;
}
