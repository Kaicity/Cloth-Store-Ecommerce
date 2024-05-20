package com.example.ctcommondal.entity;

import com.example.ctcommon.enums.TypeOptionProduct;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "option_product")
public class OptionProductEntity {
    @Id
    private String id;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private TypeOptionProduct type;

    @Column(name = "created_date")
    private String dateCreate;

    @Column(name = "created_update")
    private String dateUpdate;
}
