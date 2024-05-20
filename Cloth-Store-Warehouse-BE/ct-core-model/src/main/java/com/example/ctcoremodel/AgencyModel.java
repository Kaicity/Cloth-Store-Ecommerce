package com.example.ctcoremodel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class AgencyModel {
    private String id;
    private String name;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
    private String phone;
    private String address;
    private String code;
    private String companyId;
}
