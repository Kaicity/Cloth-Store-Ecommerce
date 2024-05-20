package com.example.ctapi.services;

import com.example.ctapi.dtos.Response.OptionProductDto;
import com.example.ctcommon.enums.TypeOptionProduct;

import java.util.List;

public interface IOptionService {
    void addOption(OptionProductDto option);

    List<OptionProductDto> getAllSizes(TypeOptionProduct typeOptionProduct);

    List<OptionProductDto> getAllColors(TypeOptionProduct typeOptionProduct);
}
