package com.example.ctapi.Mappers;

import com.example.ctapi.dtos.Response.SizesDto;
import com.example.ctcommondal.entity.SizesEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import java.util.List;
@Mapper
public interface ISizesMapper {
    ISizesMapper INSTANCE = Mappers.getMapper(ISizesMapper.class);

    @Mapping(target = "product.id", source = "productId")
    @Mapping(target = "optionProduct.id", source = "id_option")
    SizesDto toSizeDtoFromEntity(SizesEntity size);

    List<SizesDto> toSizesDtoListFromEntityList(List<SizesEntity> sizes);

    @Mapping(target = "productId", source = "product.id")
    @Mapping(target = "id_option", source = "optionProduct.id")
    SizesEntity toSizeEntityFromDto(SizesDto size);

    List<SizesEntity> toSizesEntityListFromDtoList(List<SizesDto> sizes);

}
