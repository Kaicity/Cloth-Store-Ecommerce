package com.example.ctapi.Mappers;

import com.example.ctapi.dtos.Response.OptionProductDto;
import com.example.ctcommondal.entity.OptionProductEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import java.util.List;

@Mapper
public interface IOptionProductMapper {
    IOptionProductMapper INSTANCE = Mappers.getMapper(IOptionProductMapper.class);

    @Mapping(target = "type", source = "type")
    OptionProductDto toOptionDtoFromEntity(OptionProductEntity optionProduct);

    @Mapping(target = "type", source = "type")
    OptionProductEntity toFromOptionDto(OptionProductDto optionProduct);

    List<OptionProductDto> toListOptiondtoformEntity(List<OptionProductEntity> optionProducts);
}
