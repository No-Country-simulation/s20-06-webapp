package com.comirest.app.controllers;

import com.comirest.app.DTO.FoodRequest;
import com.comirest.app.Enum.FoodCategory;
import com.comirest.app.entity.Food;
import com.comirest.app.repository.FoodRepository;
import com.comirest.app.services.CloudinaryService;
import com.comirest.app.services.FoodService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/foods")
public class FoodController {
    @Autowired
    private FoodService foodService;

    @Autowired
    private CloudinaryService cloudinaryService;

    @GetMapping
    public List<Food> getAllFoods() {
        return foodService.getAllFoods();
    }

    @GetMapping("/category/{category}")
    public List<Food> getFoodsByCategory(@PathVariable FoodCategory category) {
        return foodService.getFoodsByCategory(category);
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> createFood(

            @Parameter(description = "Nombre del menú") @RequestParam("nameMenu") String nameMenu,
            @Parameter(description = "Descripción del menú") @RequestParam("description") String description,
            @Parameter(description = "Precio del menú") @RequestParam("price") Float price,
            @Parameter(description = "Categoría del menú") @RequestParam("category") FoodCategory category,
            @RequestParam("image") MultipartFile file) {
        try {


            String imageUrl = cloudinaryService.uploadFile(file);
            System.out.println("imageUrl= "+imageUrl);
            System.out.println("Categoría= "+category);
            FoodRequest request = new FoodRequest(nameMenu, description, price, category, imageUrl);
            System.out.println(request);
            Food food = foodService.saveFood(request);
            System.out.println(food.toString());
            return ResponseEntity.ok(food);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Error "+ e.getMessage());
        }catch (RuntimeException  e) {
            return ResponseEntity.badRequest().body("Error al procesar la solicitud." + e.getMessage());
        }
    }
    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    @Operation(summary = "Actualizar un alimento existente")
    public ResponseEntity<?> updateFood(
            @PathVariable Long id,
            @Parameter(description = "Campos del alimento") @RequestParam(value = "nameMenu", required = false) String nameMenu,
            @RequestParam(value="description",required = false) String description,
            @RequestParam(value="price", required = false) Float price,
            @RequestParam(value="category", required = false) FoodCategory category,
            @RequestParam(value = "image", required = false) MultipartFile file) {

        try {/*
            // Obtener la comida existente
            Food existingFood = foodService.findFoodById(id);
            // Actualizar solo los campos proporcionados
            if (nameMenu != null && !nameMenu.isEmpty()) {
                existingFood.setNameMenu(nameMenu);
            }
            if (description != null && !description.isEmpty()) {
                existingFood.setDescription(description);
            }
            if (price != null) {
                existingFood.setPrice(price);
            }
            if (category != null) {
                existingFood.setCategory(FoodCategory.valueOf(String.valueOf(category)));
            }*/
            /*
            FoodRequest request = new FoodRequest(existingFoodAux.getNameMenu(), existingFoodAux.getDescription(),
                    existingFoodAux.getPrice(), existingFoodAux.getCategory(), existingFoodAux.getImageUrl());
*/
            // Si se proporciona una nueva imagen, subirla y actualizar la URL
         /*   if (file != null && !file.isEmpty()) {
                String imageUrl = cloudinaryService.uploadFile(file); // Suponiendo que este método existe
                existingFood.setImageUrl(imageUrl);
            }*/
            /*
            FoodRequest request = new FoodRequest(
                    existingFood.getNameMenu(),
                    existingFood.getDescription(),
                    existingFood.getPrice(),
                    existingFood.getCategory(),
                    existingFood.getImageUrl()
            );*/

            // Guardar la comida actualizada
            //Food updatedFood = foodService.saveFood(existingFood);

            return ResponseEntity.ok(foodService.updateFood(id, nameMenu, description, price, String.valueOf(category), file));

        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Comida no encontrada.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar la comida: " + e.getMessage());
        }
    }

    // Obtener comida por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getFoodById(@PathVariable Long id) {
        try {
            Food food = foodService.findFoodById(id);
            return ResponseEntity.ok(food);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    // Obtener comida por nombre
    @GetMapping("/name/{name}")
    public ResponseEntity<?> getFoodByName(@PathVariable String name) {
        try {
            Food food = foodService.findFoodByName(name);
            return ResponseEntity.ok(food);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFood(@PathVariable Long id) {
        try {
            foodService.deleteFood(id);
            return ResponseEntity.ok("Food deleted successfully");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting food: " + e.getMessage());
        }
    }
}
