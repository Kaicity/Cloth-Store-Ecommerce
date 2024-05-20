package com.example.ctapi.Mappers;

import com.example.ctapi.dtos.Response.SupplierDto;
import com.example.ctcommondal.entity.SupplierEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;
@Mapper
public interface ISupplierMapper {
    ISupplierMapper INSTANCE = Mappers.getMapper(ISupplierMapper.class);

    @Mapping(target = "status", source = "status")
    SupplierEntity toEntity(SupplierDto supplier);

    @Mapping(target = "status", source = "status")
    SupplierDto toFromSupplierEntity(SupplierEntity supplier);
    List<SupplierDto> toListSuppliertoFormEntity(List<SupplierEntity> listSupplier);
}
