package com.comirest.app.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class Movements {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(name = "food_id", nullable = false)
    private Food food;  // Ahora muchos `History` pueden referenciar un mismo `Food`

    @Column(nullable = false)
    private long quantity;
    @Column(nullable = false)
    private float priceUnit;
    @Column(nullable = false)
    private float priceTotal;

    @Column(nullable = false)
    private float profittotal;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt ;
}
