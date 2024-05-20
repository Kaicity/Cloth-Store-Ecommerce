package com.example.ctapi.dtos.Response;

import com.example.ctapi.dtos.bussinessLogic.CreateRandomID;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class SizesDto {
    private String id;
    private OptionProductDto optionProduct;
    private Double addition;
    private ProductDto product;

    public SizesDto() {
        this.id = CreateRandomID.generatingUID();
    }

    public SizesDto(String id) {
        this.id = id;
    }
}
