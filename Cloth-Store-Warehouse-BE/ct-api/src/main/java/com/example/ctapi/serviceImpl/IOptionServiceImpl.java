package com.example.ctapi.serviceImpl;

import com.example.ctapi.dtos.Response.OptionProductDto;
import com.example.ctapi.Mappers.IOptionProductMapper;
import com.example.ctapi.services.IOptionService;
import com.example.ctcommon.enums.TypeOptionProduct;
import com.example.ctcommondal.repository.IOptionProductRespository;
import com.example.ctcommondal.entity.OptionProductEntity;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IOptionServiceImpl implements IOptionService {
    private static final Logger logger = LoggerFactory.getLogger(IProductServiceImpl.class);
    private final IOptionProductRespository iOptionProductRespository;

    @Override
    public void addOption(OptionProductDto optionProduct) {
        try {
            OptionProductEntity optionProductEntity = IOptionProductMapper.INSTANCE.toFromOptionDto(optionProduct);
            System.out.println(optionProduct);
            System.out.println(optionProductEntity);
            iOptionProductRespository.save(optionProductEntity);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw e;
        }
    }

    @Override
    public List<OptionProductDto> getAllSizes(TypeOptionProduct typeOptionProduct) {
        try {
            List<OptionProductEntity> optionEntities = iOptionProductRespository.findAllOptionType(typeOptionProduct);
            List<OptionProductDto> optionDtos = IOptionProductMapper.INSTANCE.toListOptiondtoformEntity(optionEntities);
            System.out.println(optionDtos);
            return optionDtos;
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw e;
        }
    }

    @Override
    public List<OptionProductDto> getAllColors(TypeOptionProduct typeOptionProduct) {
        try {
            List<OptionProductEntity> optionEntities = iOptionProductRespository.findAllOptionType(typeOptionProduct);
            List<OptionProductDto> optionDtos = IOptionProductMapper.INSTANCE.toListOptiondtoformEntity(optionEntities);
            System.out.println(optionDtos);
            return optionDtos;
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw e;
        }
    }
}
