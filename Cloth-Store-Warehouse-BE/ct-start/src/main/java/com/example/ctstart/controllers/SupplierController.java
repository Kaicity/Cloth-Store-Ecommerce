package com.example.ctstart.controllers;

import com.example.ctapi.dtos.Response.ResponseDto;
import com.example.ctapi.dtos.Response.SupplierDto;
import com.example.ctapi.dtos.Response.SupplierSearchDto;
import com.example.ctapi.services.ISupplierService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1/Supplier")
public class SupplierController {
    private static final Logger logger = LoggerFactory.getLogger(SupplierController.class);

    @Autowired
    private final ISupplierService supplierService;

    @PostMapping("/create")
    public ResponseEntity<?> createSupplier(@RequestBody SupplierDto supplier) {
        try {
            supplierService.CreateSupplier(supplier);
            return ResponseEntity.ok(new ResponseDto(List.of("Adding data for customer"),
                    HttpStatus.CREATED.value(), supplier));
        } catch (RuntimeException e) {
            logger.error(e.getMessage(), e);
            return ResponseEntity.ok(new ResponseDto(List.of("Can not add data"),
                    HttpStatus.INTERNAL_SERVER_ERROR.value(), null));
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteSupplierById(@PathVariable String id) {
        try {
            supplierService.deleteSupplierById(id);
            return ResponseEntity.ok(new ResponseDto(List.of("Deleting data for Supplier"),
                    HttpStatus.OK.value(), null));
        } catch (RuntimeException e) {
            logger.error(e.getMessage(), e);
            return ResponseEntity.ok(new ResponseDto(List.of("Can not delete data"),
                    HttpStatus.INTERNAL_SERVER_ERROR.value(), null));
        }
    }

    @PostMapping("/updateSupplier")
    public ResponseEntity<?> updateSupplier(@RequestBody SupplierDto supplier) {
        try {
            supplierService.updateSupplier(supplier);
            return ResponseEntity.ok(new ResponseDto(List.of("Updating data for supplier"),
                    HttpStatus.CREATED.value(), supplier));
        } catch (RuntimeException e) {
            logger.error(e.getMessage(), e);
            return ResponseEntity.ok(new ResponseDto(List.of("Can not update data"),
                    HttpStatus.INTERNAL_SERVER_ERROR.value(), null));
        }
    }

    @PostMapping("/getAllSupplier")
    private ResponseEntity<?> getAllSupplier(HttpServletRequest request) {
        try {
            var result = supplierService.getAllSupplierBaseSearch();
            return ResponseEntity.ok(new ResponseDto(List.of("Successful for find!"), HttpStatus.OK.value(), result));

        } catch (RuntimeException e) {
            logger.error(e.getMessage(), e);
            return ResponseEntity.ok(new ResponseDto(List.of(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR.value(), null));
        }
    }

    @PostMapping("/seachSupplierByIds")
    private ResponseEntity<?> seachSupplierByIds(@RequestBody List<String> ids) {
        try {
            int a = 0;
            var result = supplierService.getSupplierByIds(ids);
            return ResponseEntity.ok(new ResponseDto(List.of("Seach success"), HttpStatus.OK.value(), result));
        } catch (RuntimeException e) {
            logger.error(e.getMessage(), e);
            return ResponseEntity.ok(new ResponseDto(List.of(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR.value(), null));
        }
    }

    /*@PostMapping("/getSupplier")
    private ResponseEntity<?> seachSupplierById(@RequestBody Map<String, String> requestBody) {
        try {
            int a = 0;
            String id = requestBody.get("id");
            var result = supplierService.getSupplierById(id);
            return ResponseEntity.ok(new ResponseDto(List.of("Seach success"), HttpStatus.CREATED.value(), result));
        } catch (RuntimeException e) {
            logger.error(e.getMessage(), e);
            return ResponseEntity.ok(new ResponseDto(List.of(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR.value(), null));
        }
    }*/

    @PostMapping("/searchAdvance")
    private ResponseEntity<?> searchAdvance(@RequestBody SupplierSearchDto search) {
        try {
            var result = supplierService.searchAdvance(search);
            return ResponseEntity.ok(new ResponseDto(List.of("Search success"), HttpStatus.CREATED.value(), result));
        } catch (RuntimeException e) {
            logger.error(e.getMessage(), e);
            return ResponseEntity.ok(new ResponseDto(List.of(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR.value(), null));
        }
    }
}
