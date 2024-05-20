package com.example.ctapi.services;

import com.example.ctapi.dtos.Response.CustomerDto;
import com.example.ctapi.dtos.Response.CustomerInfoDto;
import com.example.ctapi.dtos.Response.CustomerSearchDto;
import com.example.ctcommondal.entity.CustomerEntity;

import java.util.List;
import java.util.Optional;

public interface ICustomerService {
    void addCustomer(CustomerDto customer);

    //Check username account of customer
    Optional<CustomerEntity> loginAccount(String phone, String password);

    //Create Customer Information when Order Shopping
    void addCustomerInfo(CustomerInfoDto customerInfo);

    void updateCustomerInfo(CustomerInfoDto customerInfo);

    void deleteCustomerById(String id);

    void updateCustomer(CustomerDto customer);
    CustomerSearchDto getAllCustomerBaseSearch();
    CustomerDto getCustomerByIds(String id);
    List<CustomerDto> getAllCustomerListId(List<String> ids);
    CustomerDto getAllCustomerListcode(String ids);
}
