package com.example.ctcommondal.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "sizes")
public class SizesEntity {
    @Id
    private String id;

    @Column(name = "id_option")
    private String id_option;

    @Column(name = "idProduct")
    private String productId;

    @Column(name = "addition")
    private Double addition;

}
