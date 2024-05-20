package com.example.ctcoreservice.services.warehouse;


import com.example.ctcoremodel.AgencyModel;
import com.example.ctcoremodel.ResponseModel;
import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;

public interface IAngencyRequestService {

    ResponseModel<AgencyModel> getAllAgencyFromAgencyById(HttpServletRequest request, String productIds)
            throws IOException;
}
