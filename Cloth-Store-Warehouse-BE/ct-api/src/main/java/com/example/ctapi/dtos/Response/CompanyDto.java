package com.example.ctapi.dtos.Response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Data
public class CompanyDto {
    private String id;
    private String companyId;
    private String name;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
    private String phone;
    private String address;
    private String code;
}
