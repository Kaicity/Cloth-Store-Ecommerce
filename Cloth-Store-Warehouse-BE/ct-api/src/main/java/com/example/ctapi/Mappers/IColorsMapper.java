package com.example.ctapi.Mappers;

import com.example.ctapi.dtos.Response.ColorsDto;
import com.example.ctcommondal.entity.ColorsEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import java.util.List;


@Mapper
public interface IColorsMapper {
    IColorsMapper INSTANCE = Mappers.getMapper(IColorsMapper.class);

    @Mapping(target = "product.id", source = "productId")
    @Mapping(target = "optionProduct.id", source = "id_option")
    ColorsDto toColorDtoFromEntity(ColorsEntity colorsEntity);

    @Mapping(target = "productId", source = "product.id")
    @Mapping(target = "id_option", source = "optionProduct.id")
    ColorsEntity toColorEntityFromDto(ColorsDto colorsDto);

    List<ColorsDto> toColorListFromEntityList(List<ColorsEntity> colorsEntities);
    List<ColorsEntity> toColorListFromDtoList(List<ColorsDto> colors);

}
