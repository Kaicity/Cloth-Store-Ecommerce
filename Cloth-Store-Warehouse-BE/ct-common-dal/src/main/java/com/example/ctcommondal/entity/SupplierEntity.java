package com.example.ctcommondal.entity;

import com.example.ctcommon.enums.StatusSupplier;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "supplier")
public class SupplierEntity {
    @Id
    private String id;

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address")
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusSupplier status;

    @Column(name = "date_created")
    private LocalDateTime dateCreate;

    @Column(name = "date_updated")
    private LocalDateTime dateUpdate;
}
