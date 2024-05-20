package com.example.ctapi.dtos.Response;

import com.example.ctapi.dtos.bussinessLogic.CreateRandomID;
import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class CustomerInfoDto {

    private String id;
    private String eid;
    private String fullName;
    private String phone;
    private String email;
    private String address;

    public CustomerInfoDto() {
        this.id = CreateRandomID.generatingUID();
        this.eid = CreateRandomID.generateRandomCode();
    }
}
