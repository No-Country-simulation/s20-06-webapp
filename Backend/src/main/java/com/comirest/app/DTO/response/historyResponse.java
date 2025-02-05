package com.comirest.app.DTO.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class historyResponse {
    private long id;
    private String name;
    private int quantity;
    private float totalPrice;
    private String createdAt;
}
