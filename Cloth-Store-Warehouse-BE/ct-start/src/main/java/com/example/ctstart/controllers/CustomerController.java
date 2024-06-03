package com.example.ctstart.controllers;

import com.example.ctapi.Mappers.ICustomerMapper;
import com.example.ctapi.dtos.Response.CustomerDto;
import com.example.ctapi.dtos.Response.CustomerInfoDto;
import com.example.ctapi.dtos.Response.CustomerLoginRequest;
import com.example.ctapi.dtos.Response.ResponseDto;
import com.example.ctapi.services.ICustomerService;
import com.example.ctcommondal.entity.CustomerEntity;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1/Customer")
public class CustomerController {

    private static final Logger logger = LoggerFactory.getLogger(CustomerController.class);

    @Autowired
    private final ICustomerService customerService;

    @PostMapping("/create")
    public ResponseEntity<?> saveCustomer(@RequestBody CustomerDto customer) {
        try {
            customerService.addCustomer(customer);
            return ResponseEntity.ok(new ResponseDto(List.of("Adding data for customer"),
                    HttpStatus.CREATED.value(), customer));
        } catch (RuntimeException e) {
            logger.error(e.getMessage(), e);
            return ResponseEntity.ok(new ResponseDto(List.of("Can not add data"),
                    HttpStatus.INTERNAL_SERVER_ERROR.value(), null));
        }
    }

    @PostMapping("/updateCustomer")
    public ResponseEntity<?> updateCustomer(@RequestBody CustomerDto customer) {
        try {
            customerService.updateCustomer(customer);
            return ResponseEntity.ok(new ResponseDto(List.of("Updating data for customer"),
                    HttpStatus.CREATED.value(), customer));
        } catch (RuntimeException e) {
            logger.error(e.getMessage(), e);
            return ResponseEntity.ok(new ResponseDto(List.of("Can not update data"),
                    HttpStatus.INTERNAL_SERVER_ERROR.value(), null));
        }
    }


    @PostMapping("/getAllCustomer")
    private ResponseEntity<?> getAllCustomer(HttpServletRequest request) {
        try {
            int a = 0;
            var result = customerService.getAllCustomerBaseSearch();
            return ResponseEntity.ok(new ResponseDto(List.of("Successful for find!"), HttpStatus.OK.value(), result));

        } catch (RuntimeException e) {
            logger.error(e.getMessage(), e);
            return ResponseEntity.ok(new ResponseDto(List.of(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR.value(), null));
        }
    }

    @PostMapping("/getCustomerBycode")
    private ResponseEntity<?> getCustomerBycode(@RequestBody Map<String, String> request) {
        int a = 0;
        String id = request.get("eid");
        try {
            var rs = customerService.getAllCustomerListcode(id);

            return ResponseEntity.ok(new ResponseDto(
                    List.of("ok"),
                    HttpStatus.OK.value(),
                    rs
            ));
        } catch (RuntimeException e) {
            logger.error(e.getMessage(), e);
            return ResponseEntity.ok(new ResponseDto(
                    List.of(e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    null
            ));
        }
    }

    @PostMapping("/getCustomerById")
    private ResponseEntity<?> getCustomerByIds(@RequestBody Map<String, String> request) {
        int a = 0;
        String id = request.get("id");
        try {
            var rs = customerService.getCustomerByIds(id);

            return ResponseEntity.ok(new ResponseDto(
                    List.of("ok"),
                    HttpStatus.OK.value(),
                    rs
            ));
        } catch (RuntimeException e) {
            logger.error(e.getMessage(), e);
            return ResponseEntity.ok(new ResponseDto(
                    List.of(e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    null
            ));
        }
    }

    @PostMapping("/getCustomerByIdShare")
    private ResponseEntity<?> getCustomerByIdshare(@RequestBody List<String> id) {
        int a = 0;
        try {
            var rs = customerService.getAllCustomerListId(id);

            return ResponseEntity.ok(new ResponseDto(
                    List.of("ok"),
                    HttpStatus.OK.value(),
                    rs
            ));
        } catch (RuntimeException e) {
            logger.error(e.getMessage(), e);
            return ResponseEntity.ok(new ResponseDto(
                    List.of(e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    null
            ));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginCustomer(@RequestBody CustomerLoginRequest customerLoginRequest) {
        int a = 0;
        String phone = customerLoginRequest.getUsername();
        String password = customerLoginRequest.getPassword();

        Optional<CustomerEntity> customerEntity = customerService.loginAccount(phone, password);

        if (customerEntity.isPresent()) {
            CustomerDto customerDto = ICustomerMapper.INSTANCE.toFromCustomerEntity(customerEntity.get());
            return ResponseEntity.ok(customerDto);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PostMapping("/createInfo")
    public ResponseEntity<?> saveCustomerInfo(@RequestBody CustomerInfoDto customerInfo) {
        try {
            customerService.addCustomerInfo(customerInfo);
            return ResponseEntity.ok(new ResponseDto(List.of("Adding data for customer"),
                    HttpStatus.CREATED.value(), customerInfo));
        } catch (RuntimeException e) {
            logger.error(e.getMessage(), e);
            return ResponseEntity.ok(new ResponseDto(List.of("Can not add data"),
                    HttpStatus.INTERNAL_SERVER_ERROR.value(), null));
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteCustomerById(@PathVariable String id) {
        try {
            customerService.deleteCustomerById(id);
            return ResponseEntity.ok(new ResponseDto(List.of("Deleting data for customer"),
                    HttpStatus.OK.value(), null));
        } catch (RuntimeException e) {
            logger.error(e.getMessage(), e);
            return ResponseEntity.ok(new ResponseDto(List.of("Can not delete data"),
                    HttpStatus.INTERNAL_SERVER_ERROR.value(), null));
        }
    }
}

