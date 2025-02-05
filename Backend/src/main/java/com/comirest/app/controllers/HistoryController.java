package com.comirest.app.controllers;

import com.comirest.app.DTO.response.historyResponse;
import com.comirest.app.entity.History;
import com.comirest.app.services.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/admin/consumption-history")
public class HistoryController {
    @Autowired
    private HistoryService historyService;

    // Endpoint para obtener todo el historial de consumo
    @GetMapping
    public List<History> getConsumptionHistory() {
        return historyService.getAllHistories();
    }
    @GetMapping("/filter-days")
    public List<History> filterConsumptionHistory(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate  startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {
        return historyService.filterHistoriesByDate(startDate, endDate);
    }
/*
    @GetMapping("/filter-by-day")
    public List<History> filterConsumptionByDay(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {

        return historyService.filterHistoriesByDay(date);
    }
    @GetMapping("/filter-food")
    public List<History> filterConsumptionByFood(
            @RequestParam String foodName,
            @RequestParam String category,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate dateFrom,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate dateTo) {

        return historyService.filterHistoriesByFood(foodName, category, dateFrom, dateTo);
    }*/



    @PostMapping("/consume-food")
    public ResponseEntity<historyResponse> consumeFood(@RequestParam String name, @RequestParam int quantity) {
        return historyService.consumeFood(name, quantity);
    }
}
