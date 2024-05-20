package com.example.ctstart.controllers;

import com.example.ctapi.dtos.sercurity.UserPrinciple;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
public class BaseController {
    public String getCompanyID(){
        // how to get token from api -> string token:
        // by token how to get information ?
        Authentication authentication = extractAuthenticationFromToken();
        if(authentication.getPrincipal() instanceof UserPrinciple){
            return ((UserPrinciple) authentication.getPrincipal()).getCompanyId();
        }
        return null;
    }

    public String getAgencyID(){
        // how to get token from api -> string token:
        // by token how to get information ?
        Authentication authentication = extractAuthenticationFromToken();
        if(authentication.getPrincipal() instanceof UserPrinciple){
            return ((UserPrinciple) authentication.getPrincipal()).getAgencyId();
        }
        return null;
    }

    public Authentication extractAuthenticationFromToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication;
    }
}
