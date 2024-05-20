package com.example.ctcommondal.dao.impl;

import com.example.ctcommon.enums.StatusSupplier;
import com.example.ctcommondal.dao.ISupplierDao;
import com.example.ctcommondal.entity.SupplierEntity;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
public class ISupplierDaoImpl extends GenericDao implements ISupplierDao {
    @Override
    @Transactional
    public List<SupplierEntity> supplierAdvanceSearch(Map<String, Object> search) {
        Session session = getSession();// dụng cụ để truy vấn

        String queryStr = "SELECT * FROM supplier ";
        List<String> conditions = new ArrayList<>(); // chứa các điều kiện

        String code = search.get("code") != null ? search.get("code").toString() : null;
        String nameSupplier = search.get("nameSupplier") != null ? search.get("nameSupplier").toString() : null;
        String phone = search.get("phone") != null ? search.get("phone").toString() : null;

        if (code != null && !code.trim().isEmpty()) { // FE muốn chọn sản phẩm theo code
            conditions.add("code like :code");
            search.put("code", "%" + code + "%");
        }
        if (nameSupplier != null && !nameSupplier.trim().isEmpty()) { // FE muốn chọn sản phẩm theo tên
            conditions.add("name like :nameSupplier");
            search.put("nameSupplier", "%" + nameSupplier + "%");
        }
        if (phone != null && !phone.trim().isEmpty()) { // FE muốn chọn sản phẩm theo phone
            conditions.add("name like :phone");
            search.put("phone", "%" + phone + "%");
        }

        // tao dđiều kiện
        String whereStr = conditions.size() > 0 ? "where " + String.join(" and ", conditions) : "";
        // tạo câu query truy vấn
        Query<Object[]> query = session.createNativeQuery(queryStr + whereStr);
        // gán giá trị tham số truyền vô
        query.setProperties(search);
        // lấy kết quả từ câu truy vấn
        List<Object[]> resultObject = query.getResultList();
        List<SupplierEntity> rs = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.S");
        for (Object[] obj : resultObject) {
            SupplierEntity supplier = new SupplierEntity();
            supplier.setId(obj[0]!= null ?  obj[0].toString(): null);
            supplier.setCode(obj[1]!= null ?  obj[1].toString(): null);
            supplier.setName(obj[2]!= null ?  obj[2].toString(): null);
            supplier.setPhone(obj[3]!= null ?  obj[3].toString(): null);
            supplier.setAddress(obj[4]!= null ?  obj[4].toString(): null);
            supplier.setStatus(obj[5]!= null ? StatusSupplier.valueOf(obj[5].toString()):null);
            LocalDateTime dateCreate = obj[6] != null ?LocalDateTime.parse(obj[6].toString(), formatter): null;
            LocalDateTime dateUpdate = obj[7] != null ? LocalDateTime.parse(obj[7].toString(), formatter) : null;
            supplier.setDateCreate(dateCreate);
            supplier.setDateUpdate(dateUpdate);
            rs.add(supplier);
        }
        return rs;
    }
}
