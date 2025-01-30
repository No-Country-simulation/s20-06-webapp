package com.comirest.app.services;

import com.comirest.app.DTO.FoodRequest;
import com.comirest.app.Enum.FoodCategory;
import com.comirest.app.entity.Food;
import com.comirest.app.repository.FoodRepository;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Service
public class FoodService {
    @Autowired
    private FoodRepository foodRepository;
    @Autowired
    private CloudinaryService cloudinaryService;


    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    public List<Food> getFoodsByCategory(FoodCategory category) {
        return foodRepository.findByCategory(category);
    }
/*
    public Food saveFood(Food food) {
        return foodRepository.save(food);
    }*/

    public Food saveFood(FoodRequest request) throws BadRequestException {
        if (request.getImageUrl() == null || request.getImageUrl().isEmpty()) {
            throw new BadRequestException("La imagen no puede estar vacía");
        }
        // Verificar si el nombre ya existe
        if (foodRepository.existsByNameMenu(request.getNameMenu())) {
            throw new BadRequestException("Ya existe un alimento con el nombre: " + request.getNameMenu());
        }

        Food food = new Food();
        food.setNameMenu(request.getNameMenu());
        food.setDescription(request.getDescription());
        food.setPrice(request.getPrice());

        // Validación de categoría
        try {
            food.setCategory(FoodCategory.valueOf(String.valueOf(request.getCategory())));
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Categoría no válida: " + request.getCategory());
        }

        food.setImageUrl(request.getImageUrl());

        // Imprimir los valores antes de guardar
        System.out.println("Guardando food: " + food.toString());

        try {
            return foodRepository.save(food);
        } catch (Exception  e) {
            throw new BadRequestException("Error al guardar la comida: " + e.getMessage());
        }
    }

    public Food findFoodById(Long id) throws NoSuchElementException {
        return foodRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Comida no encontrada con ID: " + id));
    }
    public Food findFoodByName(String name) throws NoSuchElementException {
        return foodRepository.findByNameMenu(name)
                .orElseThrow(() -> new NoSuchElementException("Comida no encontrada con nombre: " + name));
    }
    public Food updateFood(Long id, String nameMenu, String description, Float price, String category, MultipartFile file) throws IOException {
        Food food = findFoodById(id);

        if (nameMenu != null) food.setNameMenu(nameMenu);
        if (description != null) food.setDescription(description);
        if (price != null) food.setPrice(price);
        if (category != null && !category.trim().isEmpty() && !category.equalsIgnoreCase("null")) {
            try {
                food.setCategory(FoodCategory.valueOf(category.toUpperCase()));
            } catch (IllegalArgumentException e) {
                throw new BadRequestException("Categoría no válida: " + category);
            }
        }
        if (file != null && !file.isEmpty()) food.setImageUrl(cloudinaryService.uploadFile(file));

        return foodRepository.save(food);
    }

    // Eliminar comida por ID junto con su imagen en Cloudinary
    @Transactional
    public void deleteFood(Long id) {
        Food food = findFoodById(id);  // Lanza excepción si no existe

        // Eliminar imagen de Cloudinary
        deleteImageFromCloudinary(food.getImageUrl());

        // Eliminar la comida de la base de datos
        foodRepository.delete(food);
    }

    // Método para eliminar la imagen en Cloudinary
    private void deleteImageFromCloudinary(String imageUrl) {
        if (imageUrl != null && !imageUrl.isEmpty()) {
            String publicId = extractPublicId(imageUrl);
            try {
                Map response = cloudinaryService.destroy(publicId);                System.out.println("Imagen eliminada de Cloudinary: " + response);
            } catch (Exception e) {
                System.err.println("Error al eliminar imagen de Cloudinary: " + e.getMessage());
            }
        }
    }

    // Extraer el public_id desde la URL de Cloudinary
    private String extractPublicId(String imageUrl) {
        String regex = ".*/(.*)\\..*";  // Extrae el nombre del archivo sin extensión
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(imageUrl);
        if (matcher.find()) {
            return matcher.group(1);
        }
        throw new IllegalArgumentException("No se pudo extraer el public_id de la URL: " + imageUrl);
    }

}
