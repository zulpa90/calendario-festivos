package com.calendario.api.calendario_api.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrorResponseDTO {
        private String mensaje;
        private int codigo;

        public ErrorResponseDTO(String mensaje, int codigo) {
            this.mensaje = mensaje;
            this.codigo = codigo;
        }
}
