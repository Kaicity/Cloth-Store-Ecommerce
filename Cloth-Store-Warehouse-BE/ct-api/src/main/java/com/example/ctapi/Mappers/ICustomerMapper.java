package com.example.ctapi.Mappers;

import com.example.ctapi.dtos.Response.CustomerDto;
import com.example.ctapi.dtos.Response.CustomerInfoDto;
import com.example.ctcommondal.entity.CustomerEntity;
import com.example.ctcommondal.entity.CustomerInfoEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface ICustomerMapper {
    ICustomerMapper INSTANCE = Mappers.getMapper(ICustomerMapper.class);

    @Mapping(target = "ranking", source = "ranking")
    CustomerEntity toFromCustomerDto(CustomerDto customer);

    @Mapping(target = "ranking", source = "ranking")
    CustomerDto toFromCustomerEntity(CustomerEntity customer);
    List<CustomerDto> toFromCustomerEntitylist(List<CustomerEntity> Listcustomer);

    CustomerInfoEntity toFromCustomerInfoDto(CustomerInfoDto customerInfo);
}

