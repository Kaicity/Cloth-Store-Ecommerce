package com.example.ctcoreservice.impl;

import com.example.ctcommon.util.AgencyServiceRequest;
import com.example.ctcoremodel.AgencyModel;
import com.example.ctcoremodel.ResponseModel;
import com.example.ctcoreservice.services.warehouse.IAngencyRequestService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AgencyRequestServiceImpl implements IAngencyRequestService {

    @Autowired
    private AgencyServiceRequest agencyServiceRequesa;

    private <T> T getContentResponse(Object response, Class<T> classCore) {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        T result = mapper.convertValue(response, classCore);
        return result;
    }

    @Override
    public ResponseModel<AgencyModel> getAllAgencyFromAgencyById(HttpServletRequest request, String ids) throws IOException {
        ResponseModel<AgencyModel> response = new ResponseModel();
        String url = "/api/v1/Agency/getAngecyByIds" + ids;
        response = agencyServiceRequesa.post(url, null, response.getClass(), request);
        if (response.getStatus() == HttpStatus.SC_OK && response.getResult() != null) {
            AgencyModel result = getContentResponse(response.getResult(), AgencyModel.class);
            response.setResult(result);
        }
        return response;
    }
}
