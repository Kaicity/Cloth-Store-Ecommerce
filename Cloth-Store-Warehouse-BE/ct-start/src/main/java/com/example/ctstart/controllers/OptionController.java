package com.example.ctstart.controllers;

import com.example.ctapi.dtos.Response.OptionProductDto;
import com.example.ctapi.dtos.Response.ResponseDto;
import com.example.ctapi.serviceImpl.IOptionServiceImpl;
import com.example.ctcommon.enums.TypeOptionProduct;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/option")
public class OptionController {
    private static final Logger logger = LoggerFactory.getLogger(CustomerController.class);
    @Autowired
    private final IOptionServiceImpl iOptionService;

    @PostMapping("/create")
    public ResponseEntity<?> newOption(@RequestBody OptionProductDto optionProduct){
        try {
            iOptionService.addOption(optionProduct);
            return ResponseEntity.ok(new ResponseDto(
                    List.of("Adding data for option"),
                    HttpStatus.CREATED.value(),
                    optionProduct
            ));
        } catch (RuntimeException e) {
            logger.error(e.getMessage(), e);
            return ResponseEntity.ok(new ResponseDto(
                    List.of("Can not add data"),
                    HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    null
            ));
        }
    }

    @PostMapping("/getAllSizes")
    public ResponseEntity<?> getALlOptionSizes(){
        try {
            var result = iOptionService.getAllSizes(TypeOptionProduct.SIZE);
            return ResponseEntity.ok(new ResponseDto(
                    List.of("Get all Options sizes"),
                    HttpStatus.CREATED.value(),
                    result

            ));
        } catch (RuntimeException e) {
            logger.error(e.getMessage(), e);
            return ResponseEntity.ok(new ResponseDto(
                    List.of("Can not get Data"),
                    HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    null
            ));
        }
    }

    @PostMapping("/getAllColors")
    public ResponseEntity<?> getALlOptionColors(){
        try {
            var result = iOptionService.getAllColors(TypeOptionProduct.COLOR);
            return ResponseEntity.ok(new ResponseDto(
                    List.of("Get all Options colors"),
                    HttpStatus.CREATED.value(),
                    result

            ));
        } catch (RuntimeException e) {
            logger.error(e.getMessage(), e);
            return ResponseEntity.ok(new ResponseDto(
                    List.of("Can not get Data"),
                    HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    null
            ));
        }
    }

}
