package com.calendario.api.calendario_api.data.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tipo")
public class Tipo {
    @Id
    private Long id;
    private String tipo;
}