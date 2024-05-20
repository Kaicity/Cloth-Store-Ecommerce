package com.example.ctapi.dtos.Response;

import com.example.ctapi.dtos.bussinessLogic.CreateRandomID;
import com.example.ctapi.dtos.bussinessLogic.HandleDate;
import com.example.ctcommon.enums.CustomerGender;
import com.example.ctcommon.enums.CustomerRanking;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;


import java.time.LocalDateTime;
import java.util.Date;

//@NoArgsConstructor
@Data
@AllArgsConstructor
public class CustomerDto {
    private String id;
    private String eid;
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private Date birthday;
    private LocalDateTime dateCreated;
    private LocalDateTime dateUpdated;
    @Enumerated(EnumType.STRING)
    private CustomerRanking ranking;
    @Enumerated(EnumType.STRING)
    private CustomerGender gender;
    private String password;

    private LocalDateTime getDateNowToDateCreated() {
        return HandleDate.getDatetimeNowFromSystem();
    }

    private LocalDateTime getDateWhenUpdate() {
        return HandleDate.getDatetimeNowFromSystem();
    }

    private void checkIDObject(String id) {
        if (this.id == id) {
            this.dateUpdated = getDateWhenUpdate();
        } else {
            this.dateUpdated = null;
        }
    }

    public CustomerDto() {
        this.id = CreateRandomID.generatingUID();
        this.eid = CreateRandomID.generateRandomCode();
        this.dateCreated = getDateNowToDateCreated();
    }
}
