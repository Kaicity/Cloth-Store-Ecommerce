package com.example.ctapi.dtos.Response;

import com.example.ctcoremodel.AgencyModel;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;
@Data
@AllArgsConstructor
public class EmployeeDto {
    private String id;
    private String firstname;
    private String lastname;
    private String phone;
    private String password;
    private String email;
    private String gender;
    private Date birthday;
    private int isGlobalAdmin;
    private String avatar;
    private AgencyModel agency;
    private LocalDateTime dateCreated;
    private LocalDateTime dateUpdated;
    private CompanyDto company;
}
