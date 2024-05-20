package com.example.ctapi.serviceImpl;

import com.example.ctapi.Mappers.ISupplierMapper;
import com.example.ctapi.dtos.Response.SupplierDto;
import com.example.ctapi.dtos.Response.SupplierSearchDto;
import com.example.ctapi.services.ISupplierService;
import com.example.ctcommondal.dao.ISupplierDao;
import com.example.ctcommondal.entity.SupplierEntity;
import com.example.ctcommondal.repository.ISupplierRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class ISupplierServiceImpl implements ISupplierService {
    private static final Logger logger = LoggerFactory.getLogger(ISupplierServiceImpl.class);
    private final ISupplierRepository supplierRepository;
    private final ISupplierDao supplierDao;


    @Override
    @Transactional
    public void CreateSupplier(SupplierDto supplier) {
        try {
            SupplierEntity supplierEntity = ISupplierMapper.INSTANCE.toEntity(supplier);
            supplierRepository.save(supplierEntity);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw e;
        }
    }

    @Override
    @Transactional
    public void deleteSupplierById(String id) {
        try {
            //Delete khach hang theo id hoac eid
            supplierRepository.deleteById(id);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw e;
        }
    }

    @Override
    @Transactional
    public void updateSupplier(SupplierDto supplier) {
        try {
            SupplierEntity updateSupplier = ISupplierMapper.INSTANCE.toEntity(supplier);
            updateSupplier.setDateUpdate(LocalDateTime.now());
            supplierRepository.save(updateSupplier);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw e;
        }
    }

    @Override
    public  List<SupplierDto> getSupplierByIds(List<String> ids) {
        try {
            int a = 0;
            List<SupplierEntity> supplierEntities = supplierRepository.findSupplierEntitiesByIds(ids);
            List<SupplierDto> supplierDto = ISupplierMapper.INSTANCE.toListSuppliertoFormEntity(supplierEntities);
            return supplierDto;
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw e;
        }
    }

    @Override
    @Transactional
    public SupplierSearchDto getAllSupplierBaseSearch() {
        List<SupplierEntity> supplierEntities = supplierRepository.findAll();
        List<SupplierDto> supplier = ISupplierMapper.INSTANCE.toListSuppliertoFormEntity(supplierEntities);
        SupplierSearchDto result = new SupplierSearchDto();
        result.setResult(supplier);
        return result;
    }

    @Override
    @Transactional
    public SupplierSearchDto searchAdvance(SupplierSearchDto searchDto) {
        Map<String, Object> mapSearch = new HashMap<>();
        mapSearch.put("code", searchDto.getCode());
        mapSearch.put("nameSupllier", searchDto.getName());
        mapSearch.put("phone", searchDto.getPhone());
        List<SupplierEntity> supplierEntities = supplierDao.supplierAdvanceSearch(mapSearch);
        List<SupplierDto> supplier = ISupplierMapper.INSTANCE.toListSuppliertoFormEntity(supplierEntities);
        searchDto.setResult(supplier);
        return searchDto;
    }

}
