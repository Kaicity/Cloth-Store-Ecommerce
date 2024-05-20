package com.example.ctapi.dtos.Response;

import com.example.ctapi.dtos.bussinessLogic.CreateRandomID;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ColorsDto {
    private String id;
    private OptionProductDto optionProduct;
    private Double addition;
    private String image;
    private ProductDto product;

    public ColorsDto() {
        this.id = CreateRandomID.generatingUID();
    }

    public ColorsDto(String id) {
        this.id = id;
    }
}
