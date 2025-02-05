package com.comirest.app.repository;

import com.comirest.app.entity.History;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface HistoryRepository extends JpaRepository<History, Long> {
    List<History> findByCreatedAtBetween(LocalDateTime startDateTime, LocalDateTime endDateTime);
/*
    // Buscar por comida, categoría y opcionalmente por fechas
    List<History> findByFoodNameAndCategoryAndCreatedAtBetween(
            String foodName, String category, LocalDateTime startDateTime, LocalDateTime endDateTime);*/
}
