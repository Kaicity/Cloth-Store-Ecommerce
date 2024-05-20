package com.example.ctapi.dtos.bussinessLogic;

import java.time.LocalDateTime;
import java.time.ZoneId;

public class HandleDate {

    public static LocalDateTime getDatetimeNowFromSystem() {
        return LocalDateTime.now(ZoneId.systemDefault());
    }
}
