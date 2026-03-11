package com.calendario.api.calendario_api.controller;

import com.calendario.api.calendario_api.data.entity.Calendario;
import com.calendario.api.calendario_api.dto.FestivoDTO;
import com.calendario.api.calendario_api.service.CalendarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CalendarioController {

    @Autowired
    private CalendarioService service;

    @GetMapping("/festivos/obtener/{year}")
    public ResponseEntity<List<FestivoDTO>> obtenerFestivos(@PathVariable int year) {
        return ResponseEntity.ok(service.getHolidaysByYear(year));
    }

    @PostMapping("/calendario/generar/{year}")
    public ResponseEntity<Boolean> generarCalendario(@PathVariable int year) {
        return ResponseEntity.ok(service.generateCalendar(year));
    }

    @GetMapping("/calendario/listar/{year}")
    public ResponseEntity<List<Calendario>> listarCalendario(@PathVariable int year) {
        return ResponseEntity.ok(service.getByYear(year));
    }
}