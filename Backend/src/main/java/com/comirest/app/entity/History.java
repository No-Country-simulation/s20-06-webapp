package com.comirest.app.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class History {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "food_id", nullable = false)
    private Food food;  // Ahora muchos `History` pueden referenciar un mismo `Food`

    @Column(nullable = false)
    private long quantity;
    @Column(nullable = false)
    private float total;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt ;

}
