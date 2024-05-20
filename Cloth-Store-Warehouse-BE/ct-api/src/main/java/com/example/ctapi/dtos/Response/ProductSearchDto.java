package com.example.ctapi.dtos.Response;

import com.example.ctapi.dtos.request.BaseSearchDto;
import lombok.Data;
import java.util.List;

@Data
public class ProductSearchDto extends BaseSearchDto<List<ProductDto>> {
    String idCompany;
    String status;
    String priceMin;
    String code;
    String name;
    String rangePrice;

    // {"priceMin":"10-200000"
    // "code":"12313123213123"
    // "name":"ronaldo"}
}
