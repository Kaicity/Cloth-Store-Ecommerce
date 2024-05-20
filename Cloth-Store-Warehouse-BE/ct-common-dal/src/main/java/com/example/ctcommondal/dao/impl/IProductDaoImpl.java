package com.example.ctcommondal.dao.impl;

import com.example.ctcommon.enums.SpecificationProduct;
import com.example.ctcommondal.dao.IProductDao;
import com.example.ctcommondal.entity.ProductEntity;
import jakarta.transaction.Transactional;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
public class IProductDaoImpl extends GenericDao implements IProductDao {
    @Override
    @Transactional
    public List<ProductEntity> productAdvanceSearch(Map<String, Object> search) {
        Session session = getSession();// dụng cụ để truy vấn

        String queryStr = "SELECT * from product ";
        List<String> conditions = new ArrayList<>(); // chứa các điều kiện

        String code = search.get("code") != null ? search.get("code").toString() : null;
        String nameProduct = search.get("nameProduct") != null ? search.get("nameProduct").toString() : null;
        String inputPrice = search.get("price") != null ? search.get("price").toString() : null;

        if (code != null && !code.trim().isEmpty()) { // FE muốn chọn sản phẩm theo code
            conditions.add("code like :code");
            search.put("code", "%" + code + "%");
        }
        if (nameProduct != null && !nameProduct.trim().isEmpty()) { // FE muốn chọn sản phẩm theo tên
            conditions.add("name like :nameProduct");
            search.put("nameProduct", "%" + nameProduct + "%");
        }
        if (inputPrice != null && !inputPrice.trim().isEmpty()) { // FE muốn chọn sản phẩm theo tên
            conditions.add("price between :startPrice and :endPrice");
          //  "200,000 - 400,000"
            String startPrice = inputPrice.split(" - ")[0].replace(",","");
            String endPrice = inputPrice.split(" - ")[1].replace(",","");
            search.put("startPrice", startPrice);
            search.put("endPrice", endPrice);
        }
        // tao dđiều kiện
        String whereStr = conditions.size() > 0 ? "where " + String.join(" and ", conditions) : "";
        // tạo câu query truy vấn
        Query<Object[]> query = session.createNativeQuery(queryStr + whereStr);
        // gán giá trị tham số truyền vô
        query.setProperties(search);
        // lấy kết quả từ câu truy vấn
        List<Object[]> resultObject = query.getResultList();
        List<ProductEntity> rs = new ArrayList<>();
        for (Object[] obj : resultObject) {
            ProductEntity product = new ProductEntity();
            product.setId(obj[0].toString());
            product.setCode(obj[1].toString());
            product.setName(obj[2].toString());
            product.setPrice(Double.parseDouble(obj[3].toString()));
//          product.setStatus(obj[4].toString());
            product.setImage(obj[5].toString());
            product.setDescription(obj[6].toString());
            product.setSpecification(SpecificationProduct.valueOf(obj[7].toString()));
            rs.add(product);
        }
        return rs;
    }
}
