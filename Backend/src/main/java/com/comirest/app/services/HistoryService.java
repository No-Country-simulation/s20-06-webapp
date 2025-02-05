package com.comirest.app.services;

import com.comirest.app.DTO.response.historyResponse;
import com.comirest.app.entity.Food;
import com.comirest.app.entity.History;
import com.comirest.app.repository.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import java.time.format.DateTimeFormatter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
public class HistoryService {
    @Autowired
    private HistoryRepository historyRepository;
    @Autowired
    private FoodService foodService;

    // Método para obtener todo el historial
    public List<History> getAllHistories() {
        return historyRepository.findAll();
    }

    // Método para filtrar por fechas
    public List<History> filterHistoriesByDate(LocalDate startDate, LocalDate endDate) {
        // Convertir LocalDate a LocalDateTime (Inicio del día y Fin del día)
        LocalDateTime startDateTime = startDate.atStartOfDay(); // 2025-01-10 00:00:00
        LocalDateTime endDateTime = endDate.atTime(LocalTime.MAX); // 2025-01-14 23:59:59

        return historyRepository.findByCreatedAtBetween(startDateTime, endDateTime);
    }
/*
    public List<History> filterHistoriesByDay(LocalDate date) {
        LocalDateTime startOfDay = date.atStartOfDay(); // 2025-01-14 00:00:00
        LocalDateTime endOfDay = date.atTime(LocalTime.MAX); // 2025-01-14 23:59:59.999999999
        return historyRepository.findByCreatedAtBetween(startOfDay, endOfDay);
    }
    // Filtrar por comida, categoría y opcionalmente por rango de fechas
    public List<History> filterHistoriesByFood(String foodName, String category, LocalDate dateFrom, LocalDate dateTo) {
        LocalDateTime startDateTime = (dateFrom != null) ? dateFrom.atStartOfDay() : LocalDateTime.MIN;
        LocalDateTime endDateTime = (dateTo != null) ? dateTo.atTime(LocalTime.MAX) : LocalDateTime.MAX;
        return historyRepository.findByFoodNameAndCategoryAndCreatedAtBetween(foodName, category, startDateTime, endDateTime);
    }
*/

    public ResponseEntity<historyResponse> consumeFood(String name, int quantity) {
        Food food = foodService.findFoodByName(name); // Obtiene info del FoodController
        float totalPrice = food.getPrice() * quantity;

        History history = new History();
        history.setFood(food);
        history.setQuantity(quantity);
        history.setTotal(totalPrice);
        history.setCreatedAt(LocalDateTime.now());
        historyRepository.save(history);
        historyResponse response = new historyResponse(
                history.getId(),
                name,
                quantity,
                totalPrice,
                history.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
        );
        return ResponseEntity.ok(response);
    }
}
