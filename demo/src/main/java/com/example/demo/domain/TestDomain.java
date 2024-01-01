package com.example.demo.Domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document("test")
@Data
public class TestDomain {
    @Id
    private String id;
    private String name;
    private String value;
}
