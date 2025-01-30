package com.comirest.app.repository;

import com.comirest.app.Enum.FoodCategory;
import com.comirest.app.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {
    List<Food> findByCategory(FoodCategory category);

    Optional<Food> findByNameMenu(String nameMenu);

    boolean existsByNameMenu(String nameMenu);

}