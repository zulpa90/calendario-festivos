package com.calendario.api.calendario_api.data.repository;

import com.calendario.api.calendario_api.data.entity.Tipo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoRepository extends JpaRepository<Tipo, Long> {
}