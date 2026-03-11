package com.calendario.api.calendario_api.data.repository;

import com.calendario.api.calendario_api.data.entity.Calendario;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CalendarioRepository extends JpaRepository<Calendario, Long> {

    @Query("SELECT c FROM Calendario c WHERE YEAR(c.fecha) = :year")
    List<Calendario> findByYear(@Param("year") int year);

    @Modifying
    @Transactional
    @Query("DELETE FROM Calendario c WHERE YEAR(c.fecha) = :year")
    void deleteByYear(@Param("year") int year);
}