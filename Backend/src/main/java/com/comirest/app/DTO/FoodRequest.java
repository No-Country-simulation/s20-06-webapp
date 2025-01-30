package com.comirest.app.DTO;

import com.comirest.app.Enum.FoodCategory;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FoodRequest {
    private String nameMenu;
    private String description;
    private Float price;
    private FoodCategory category;
    private String imageUrl; // Imagen

}
