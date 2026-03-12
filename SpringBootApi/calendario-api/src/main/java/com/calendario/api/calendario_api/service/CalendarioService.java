package com.calendario.api.calendario_api.service;

import com.calendario.api.calendario_api.data.entity.Calendario;
import com.calendario.api.calendario_api.data.entity.Tipo;
import com.calendario.api.calendario_api.data.repository.CalendarioRepository;
import com.calendario.api.calendario_api.data.repository.TipoRepository;
import com.calendario.api.calendario_api.dto.FestivoDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CalendarioService {

    @Autowired
    private CalendarioRepository calendarioRepository;

    @Autowired
    private TipoRepository tipoRepository;

    private final RestTemplate restTemplate = new RestTemplate();
    @Value("${festivos.api.url}")
    private String apiFestivosUrl;

    public List<FestivoDTO> getHolidaysByYear(int year) {
        String url = apiFestivosUrl + year;

        FestivoDTO[] festivosArray = restTemplate.getForObject(url, FestivoDTO[].class);
        return Arrays.asList(festivosArray);
    }

    @Transactional
    public boolean generateCalendar(int year) {
        try {
            calendarioRepository.deleteByYear(year);

            List<FestivoDTO> listaFestivos = getHolidaysByYear(year);

            Map<LocalDate, String> mapaFestivos = listaFestivos.stream()
                    .collect(Collectors.toMap(FestivoDTO::getFecha, FestivoDTO::getFestivo));

            LocalDate fechaActual = LocalDate.of(year, 1, 1);
            Tipo laboral = tipoRepository.findById(1L).orElseThrow();
            Tipo finSemana = tipoRepository.findById(2L).orElseThrow();
            Tipo festivoTipo = tipoRepository.findById(3L).orElseThrow();

            List<Calendario> nuevosRegistros = new ArrayList<>();

            while (fechaActual.getYear() == year) {
                Calendario dia = new Calendario();

                dia.setFecha(fechaActual.atTime(5, 0).atOffset(ZoneOffset.UTC));

                String nombreDia = fechaActual.getDayOfWeek().getDisplayName(TextStyle.FULL, new Locale("es", "ES"));
                dia.setDescripcion(nombreDia.substring(0, 1).toUpperCase() + nombreDia.substring(1).toLowerCase());

                if (mapaFestivos.containsKey(fechaActual)) {
                    dia.setTipo(festivoTipo);
                } else {
                    DayOfWeek dow = fechaActual.getDayOfWeek();
                    if (dow == DayOfWeek.SATURDAY || dow == DayOfWeek.SUNDAY) {
                        dia.setTipo(finSemana);
                    } else {
                        dia.setTipo(laboral);
                    }
                }

                nuevosRegistros.add(dia);
                fechaActual = fechaActual.plusDays(1);
            }

            calendarioRepository.saveAll(nuevosRegistros);
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<Calendario> getByYear(int year) {
        List<Calendario> resultados = calendarioRepository.findByYear(year);

        if (resultados.isEmpty()) {
            throw new RuntimeException("El año " + year + " aún no ha sido procesado. " +
                    "Por favor, utilice el endpoint /api/calendario/generar/" + year + " primero.");
        }
        return resultados;
    }
}