package com.example.ctapi.services;

import com.example.ctapi.dtos.Response.EmployeeDto;

public interface IEmployeeService {
    EmployeeDto getEmployeeByEmail(String email, String password);
}
