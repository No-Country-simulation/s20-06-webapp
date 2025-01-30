package com.comirest.app.entity;

import com.comirest.app.Enum.FoodCategory;
import jakarta.persistence.*;
import lombok.Data;

import java.awt.*;

@Data
@Entity
@Table(name = "Food")
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "name_menu", nullable = false, unique = true)
    private String  nameMenu;

    private String description;
    @Column(nullable = false)
    private float price;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FoodCategory category;

    @Column(nullable = false)
    private String imageUrl;  // URL de la imagen

}
