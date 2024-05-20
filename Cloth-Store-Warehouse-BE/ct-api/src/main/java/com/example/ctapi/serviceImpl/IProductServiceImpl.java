package com.example.ctapi.serviceImpl;

import com.example.ctapi.Mappers.IColorsMapper;
import com.example.ctapi.Mappers.IOptionProductMapper;
import com.example.ctapi.Mappers.IProductMapper;
import com.example.ctapi.Mappers.ISizesMapper;
import com.example.ctapi.dtos.Response.*;
import com.example.ctapi.services.IProductService;
import com.example.ctcommondal.dao.IProductDao;
import com.example.ctcommondal.entity.ColorsEntity;
import com.example.ctcommondal.entity.OptionProductEntity;
import com.example.ctcommondal.entity.ProductEntity;
import com.example.ctcommondal.entity.SizesEntity;
import com.example.ctcommondal.repository.IColorsRepository;
import com.example.ctcommondal.repository.IOptionProductRespository;
import com.example.ctcommondal.repository.IProductRepository;
import com.example.ctcommondal.repository.ISizesRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IProductServiceImpl implements IProductService {
    private static final Logger logger = LoggerFactory.getLogger(IProductServiceImpl.class);
    private final IProductRepository productRepository;
    private final IColorsRepository colorsRepository;
    private final ISizesRepository sizesRepository;
    private final IOptionProductRespository optionProductRespository;
    private final IProductDao productDao;

    @Transactional
    @Override
    public ProductDto getProductById(String id) {
        try {
            // lay ds OptionProduct
            List<OptionProductEntity> optionProductEntities = optionProductRespository.findAll();
            List<OptionProductDto> optionProductDtos = IOptionProductMapper.INSTANCE.toListOptiondtoformEntity(optionProductEntities);

            ProductEntity productEntity = productRepository.findById(id).get();
            ProductDto productDto = IProductMapper.INSTANCE.toProductDtoFromEntity(productEntity);

            List<ColorsEntity> colorsEntities = colorsRepository.findAllColorsByProductId(id);
            List<ColorsDto> colorDtos = IColorsMapper.INSTANCE.toColorListFromEntityList(colorsEntities);
            for (ColorsDto colorsDto : colorDtos) {
                List<OptionProductDto> result = optionProductDtos.stream()
                        .filter(option -> colorsDto.getOptionProduct().getId().equals(option.getId()))
                        .collect(Collectors.toList());

                colorsDto.setOptionProduct(result.size() == 0 ? null : result.get(0));
            }

            List<SizesEntity> sizesEntities = sizesRepository.findAllColorsbyProductId(id);
            List<SizesDto> sizesDtos = ISizesMapper.INSTANCE.toSizesDtoListFromEntityList(sizesEntities);
            for (SizesDto sizesDto : sizesDtos) {
                List<OptionProductDto> result = optionProductDtos.stream()
                        .filter(option -> sizesDto.getOptionProduct().getId().equals(option.getId()))
                        .collect(Collectors.toList());

                sizesDto.setOptionProduct(result.size() == 0 ? null : result.get(0));
            }
            productDto.setColors(colorDtos);
            productDto.setSizes(sizesDtos);
            return productDto;
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw e;
        }
    }

    @Transactional
    @Override
    public ProductSearchDto getAllProductUseBaseSearch() {
        try {
            int i = 0;
            // lay ds OptionProduct
            List<OptionProductEntity> optionProductEntities = optionProductRespository.findAll();
            List<OptionProductDto> optionProductDtos = IOptionProductMapper.INSTANCE.toListOptiondtoformEntity(optionProductEntities);

            List<ProductEntity> productEntityList = productRepository.findAll();
            List<ProductDto> products = IProductMapper.INSTANCE.toProductDtoListFromEntityList(productEntityList);
            List<String> productIDs = products.stream().map(ProductDto::getId).collect(Collectors.toList());

            List<ColorsEntity> colorsEntities = colorsRepository.findAllColorsByProductIds(productIDs);
            List<ColorsDto> colorDtos = IColorsMapper.INSTANCE.toColorListFromEntityList(colorsEntities);
            for (ColorsDto colorsDto : colorDtos) {
                List<OptionProductDto> result = optionProductDtos.stream()
                        .filter(option -> colorsDto.getOptionProduct().getId().equals(option.getId()))
                        .collect(Collectors.toList());

                colorsDto.setOptionProduct(result.size() == 0 ? null : result.get(0));
            }

            List<SizesEntity> sizesEntities = sizesRepository.findAllColorsbyProductIds(productIDs);
            List<SizesDto> sizesDtos = ISizesMapper.INSTANCE.toSizesDtoListFromEntityList(sizesEntities);
            for (SizesDto sizesDto : sizesDtos) {
                List<OptionProductDto> result = optionProductDtos.stream()
                        .filter(option -> sizesDto.getOptionProduct().getId().equals(option.getId()))
                        .collect(Collectors.toList());

                sizesDto.setOptionProduct(result.size() == 0 ? null : result.get(0));
            }

            for (ProductDto product : products) {
                List<ColorsDto> colorsList = colorDtos.stream()
                        .filter(obj -> obj.getProduct().getId().equals(product.getId()))
                        .collect(Collectors.toList());
                colorsList.forEach(color -> color.setProduct(null));
                colorDtos.removeAll(colorsList);

                List<SizesDto> sizesList = sizesDtos.stream()
                        .filter(obj -> obj.getProduct().getId().equals(product.getId()))
                        .collect(Collectors.toList());

                sizesList.forEach(size -> size.setProduct(null));
                sizesDtos.removeAll(sizesList);

                product.setSizes(sizesList);
                product.setColors(colorsList);
            }
            ProductSearchDto result = new ProductSearchDto();
            result.setResult(products);
            return result;
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw e;
        }
    }

    @Transactional
    @Override
    public List<ProductDto> getAllProductByIds(List<String> productIds) {
        List<ProductEntity> productEntities = productRepository.findAllById(productIds);
        List<ProductDto> result = IProductMapper.INSTANCE.toProductDtoListFromEntityList(productEntities);
        return result;
    }

    @Transactional
    @Override
    public void addProduct(ProductDto productDto) {
        try {
            int a=0;
            ProductEntity productEntity = IProductMapper.INSTANCE.toProductEntityFromDto(productDto);
            productRepository.save(productEntity);

            for (SizesDto size : productDto.getSizes()) {
                ProductDto sizeOfProduct = new ProductDto(productDto.getId());
                size.setProduct(sizeOfProduct);
            }
            for (ColorsDto color : productDto.getColors()) {
                ProductDto colorOfProduct = new ProductDto(productDto.getId());
                color.setProduct(colorOfProduct);
            }

            List<SizesEntity> sizes = ISizesMapper.INSTANCE.toSizesEntityListFromDtoList(productDto.getSizes());
            List<ColorsEntity> colors = IColorsMapper.INSTANCE.toColorListFromDtoList(productDto.getColors());

            sizesRepository.saveAll(sizes);
            colorsRepository.saveAll(colors);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw e;
        }
    }

    @Transactional
    @Override
    public void deleteProduct(String id) {
        try {
            List<ColorsEntity> colorsEntities = colorsRepository.findAllColorsByProductId(id);
            colorsRepository.deleteAll(colorsEntities);

            List<SizesEntity> sizesEntities = sizesRepository.findAllColorsbyProductId(id);
            sizesRepository.deleteAll(sizesEntities);

            productRepository.deleteById(id);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw e;
        }
    }

    @Transactional
    @Override
    public void updateProduct(ProductDto productDto) {
        try {
            ProductEntity productEntity = productRepository.findProductById(productDto.getId());

            ProductEntity existingProduct = productEntity;
            existingProduct.setName(productDto.getName());
            existingProduct.setPrice(productDto.getPrice());
            existingProduct.setStatus(productDto.getStatus());
            existingProduct.setDescription(productDto.getDescription());
            existingProduct.setImage(productDto.getImage());
            existingProduct.setSpecification(productDto.getSpecification());
            productRepository.save(existingProduct);

            //Xóa product id có sizes
            List<SizesEntity> sizesEntities = sizesRepository.findAllColorsbyProductId(productDto.getId());
            sizesRepository.deleteAll(sizesEntities);

            //Lấy Size mới
            List<SizesEntity> sizesEntitiesUpdate = ISizesMapper.INSTANCE.toSizesEntityListFromDtoList(productDto.getSizes());
            for(SizesEntity size : sizesEntitiesUpdate){
                size.setProductId(productDto.getId());
                sizesRepository.save(size);
            }

            //Xóa product id có colors
            List<ColorsEntity> colorEntities = colorsRepository.findAllColorsByProductId(productDto.getId());
            colorsRepository.deleteAll(colorEntities);

            //Lấy Color mới
            List<ColorsEntity> colorEntitiesUpdate = IColorsMapper.INSTANCE.toColorListFromDtoList(productDto.getColors());
            for(ColorsEntity color : colorEntitiesUpdate){
                color.setProductId(productDto.getId());
                colorsRepository.save(color);
            }

        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw e;
        }
    }

    @Override
    public ProductSearchDto seachProductByPrice(Double priceMin, Double priceMax) {
        try {
            // lay ds OptionProduct
            List<OptionProductEntity> optionProductEntities = optionProductRespository.findAll();
            List<OptionProductDto> optionProductDtos = IOptionProductMapper.INSTANCE.toListOptiondtoformEntity(optionProductEntities);

            List<ProductEntity> productEntities = productRepository.findProductByPrice(priceMin, priceMax);
            List<ProductDto> productDtos = IProductMapper.INSTANCE.toProductDtoListFromEntityList(productEntities);
            List<String> productIDs = productDtos.stream().map(ProductDto::getId).collect(Collectors.toList());

            List<ColorsEntity> colorsEntities = colorsRepository.findAllColorsByProductIds(productIDs);
            List<ColorsDto> colorsDtos = IColorsMapper.INSTANCE.toColorListFromEntityList(colorsEntities);
            for (ColorsDto colorsDto : colorsDtos) {
                List<OptionProductDto> result = optionProductDtos.stream()
                        .filter(option -> colorsDto.getOptionProduct().getId().equals(option.getId()))
                        .collect(Collectors.toList());

                colorsDto.setOptionProduct(result.size() == 0 ? null : result.get(0));
            }

            List<SizesEntity> sizesEntities = sizesRepository.findAllColorsbyProductIds(productIDs);
            List<SizesDto> sizesDtos = ISizesMapper.INSTANCE.toSizesDtoListFromEntityList(sizesEntities);
            for (SizesDto sizesDto : sizesDtos) {
                List<OptionProductDto> result = optionProductDtos.stream()
                        .filter(option -> sizesDto.getOptionProduct().getId().equals(option.getId()))
                        .collect(Collectors.toList());
                sizesDto.setOptionProduct(result.size() == 0 ? null : result.get(0));
            }

            for (ProductDto product : productDtos) {
                List<ColorsDto> colorsList = colorsDtos.stream()
                        .filter(obj -> obj.getProduct().getId().equals(product.getId()))
                        .collect(Collectors.toList());
                colorsList.forEach(color -> color.setProduct(null));
                colorsDtos.removeAll(colorsList);
                List<SizesDto> sizesList = sizesDtos.stream()
                        .filter(obj -> obj.getProduct().getId().equals(product.getId()))
                        .collect(Collectors.toList());
                sizesList.forEach(size -> size.setProduct(null));
                sizesDtos.removeAll(sizesList);

                product.setSizes(sizesList);
                product.setColors(colorsList);
            }
            ProductSearchDto result = new ProductSearchDto();
            result.setResult(productDtos);
            return result;
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw e;
        }
    }

    @Transactional
    @Override
    public ProductDto seachProductForCode(String code) {
        try {
            // lay ds OptionProduct
            List<OptionProductEntity> optionProductEntities = optionProductRespository.findAll();
            List<OptionProductDto> optionProductDtos = IOptionProductMapper.INSTANCE.toListOptiondtoformEntity(optionProductEntities);

            ProductEntity productEntity = productRepository.findProductByCode(code);
            ProductDto productDto = IProductMapper.INSTANCE.toProductDtoFromEntity(productEntity);

            List<ColorsEntity> colorsEntities = colorsRepository.findAllColorsByProductId(productDto.getId());
            List<ColorsDto> colorsDtos = IColorsMapper.INSTANCE.toColorListFromEntityList(colorsEntities);
            for (ColorsDto colorsDto : colorsDtos) {
                List<OptionProductDto> result = optionProductDtos.stream()
                        .filter(option -> colorsDto.getOptionProduct().getId().equals(option.getId()))
                        .collect(Collectors.toList());

                colorsDto.setOptionProduct(result.size() == 0 ? null : result.get(0));
            }

            List<SizesEntity> sizesEntities = sizesRepository.findAllColorsbyProductId(productDto.getId());
            List<SizesDto> sizesDtos = ISizesMapper.INSTANCE.toSizesDtoListFromEntityList(sizesEntities);
            for (SizesDto sizesDto : sizesDtos) {
                List<OptionProductDto> result = optionProductDtos.stream()
                        .filter(option -> sizesDto.getOptionProduct().getId().equals(option.getId()))
                        .collect(Collectors.toList());
                sizesDto.setOptionProduct(result.size() == 0 ? null : result.get(0));
            }

            List<ColorsDto> colorsList = colorsDtos.stream()
                    .filter(obj -> obj.getProduct().getId().equals(productDto.getId()))
                    .collect(Collectors.toList());
            colorsList.forEach(color -> color.setProduct(null));
            colorsDtos.removeAll(colorsList);

            List<SizesDto> sizesList = sizesDtos.stream()
                    .filter(obj -> obj.getProduct().getId().equals(productDto.getId()))
                    .collect(Collectors.toList());
            sizesList.forEach(size -> size.setProduct(null));
            sizesDtos.removeAll(sizesList);

            productDto.setColors(colorsList);
            productDto.setSizes(sizesList);
            return productDto;
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw e;
        }
    }

    @Transactional
    @Override
    public ProductSearchDto seachProductForName(String name) {
        try {
            // lay ds OptionProduct
            List<OptionProductEntity> optionProductEntities = optionProductRespository.findAll();
            List<OptionProductDto> optionProductDtos = IOptionProductMapper.INSTANCE.toListOptiondtoformEntity(optionProductEntities);

            List<ProductEntity> productEntities = productRepository.findProductByName(name);
            List<ProductDto> productDtos = IProductMapper.INSTANCE.toProductDtoListFromEntityList(productEntities);
            List<String> productIDs = productDtos.stream().map(ProductDto::getId).collect(Collectors.toList());

            List<ColorsEntity> colorsEntities = colorsRepository.findAllColorsByProductIds(productIDs);
            List<ColorsDto> colorsDtos = IColorsMapper.INSTANCE.toColorListFromEntityList(colorsEntities);
            for (ColorsDto colorsDto : colorsDtos) {
                List<OptionProductDto> result = optionProductDtos.stream()
                        .filter(option -> colorsDto.getOptionProduct().getId().equals(option.getId()))
                        .collect(Collectors.toList());

                colorsDto.setOptionProduct(result.size() == 0 ? null : result.get(0));
            }

            List<SizesEntity> sizesEntities = sizesRepository.findAllColorsbyProductIds(productIDs);
            List<SizesDto> sizesDtos = ISizesMapper.INSTANCE.toSizesDtoListFromEntityList(sizesEntities);
            for (SizesDto sizesDto : sizesDtos) {
                List<OptionProductDto> result = optionProductDtos.stream()
                        .filter(option -> sizesDto.getOptionProduct().getId().equals(option.getId()))
                        .collect(Collectors.toList());
                sizesDto.setOptionProduct(result.size() == 0 ? null : result.get(0));
            }

            for (ProductDto product : productDtos) {
                List<ColorsDto> colorsList = colorsDtos.stream()
                        .filter(obj -> obj.getProduct().getId().equals(product.getId()))
                        .collect(Collectors.toList());
                colorsList.forEach(color -> color.setProduct(null));
                colorsDtos.removeAll(colorsList);
                List<SizesDto> sizesList = sizesDtos.stream()
                        .filter(obj -> obj.getProduct().getId().equals(product.getId()))
                        .collect(Collectors.toList());
                sizesList.forEach(size -> size.setProduct(null));
                sizesDtos.removeAll(sizesList);

                product.setSizes(sizesList);
                product.setColors(colorsList);
            }
            ProductSearchDto result = new ProductSearchDto();
            result.setResult(productDtos);
            return result;
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw e;
        }
    }

    @Override
    public ProductSearchDto searchAdvance(ProductSearchDto searchDto) {
        Map<String, Object> mapSearch = new HashMap<>();
        mapSearch.put("code", searchDto.getCode());
        mapSearch.put("nameProduct", searchDto.getName());
        mapSearch.put("price", searchDto.getRangePrice());
        List<ProductEntity> productEntities = productDao.productAdvanceSearch(mapSearch);
        List<ProductDto> productDtos = IProductMapper.INSTANCE.toProductDtoListFromEntityList(productEntities);
        searchDto.setResult(productDtos);
        return searchDto;
    }
}
