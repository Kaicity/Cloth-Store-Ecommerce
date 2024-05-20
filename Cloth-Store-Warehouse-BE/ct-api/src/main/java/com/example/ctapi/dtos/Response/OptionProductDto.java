package com.example.ctapi.dtos.Response;

import com.example.ctapi.dtos.bussinessLogic.CreateRandomID;
import com.example.ctapi.dtos.bussinessLogic.HandleDate;
import com.example.ctcommon.enums.TypeOptionProduct;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class OptionProductDto {
    private String id;
    private String name;
    private TypeOptionProduct type;
    private LocalDateTime dateCreate;
    private LocalDateTime dateUpdate;

    public OptionProductDto(){
        this.id = CreateRandomID.generatingUID();
        this.dateCreate = HandleDate.getDatetimeNowFromSystem();
    }
}
