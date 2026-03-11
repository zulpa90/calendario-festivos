package com.calendario.api.calendario_api.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class FestivoDTO {
    private String festivo;
    private LocalDate fecha;

    public FestivoDTO() {
    }

    public FestivoDTO(String festivo, LocalDate fecha) {
        this.festivo = festivo;
        this.fecha = fecha;
    }
}