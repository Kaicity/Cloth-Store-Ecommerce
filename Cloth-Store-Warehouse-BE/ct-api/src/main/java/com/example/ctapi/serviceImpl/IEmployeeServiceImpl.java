package com.example.ctapi.serviceImpl;

import com.example.ctapi.Mappers.IEmployeeMapper;
import com.example.ctapi.dtos.Response.EmployeeDto;
import com.example.ctapi.services.IEmployeeService;
import com.example.ctcommondal.entity.EmployeeEntity;
import com.example.ctcommondal.repository.IEmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class IEmployeeServiceImpl implements IEmployeeService {

    private final IEmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public EmployeeDto getEmployeeByEmail(String email, String password) {
        Optional<EmployeeEntity> employee = employeeRepository.findCustomerByEmail(email);
        if (employee.isPresent()) {
            EmployeeEntity employeeEntity = employee.get();
            EmployeeDto result = IEmployeeMapper.INSTANCE.toEmployeeDtoFromEntity(employeeEntity);
            return passwordEncoder.matches(password, result.getPassword()) ? result : null;
        }
        return null;
    }
}
