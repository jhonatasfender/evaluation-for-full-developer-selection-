package com.evaluation.api.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Phone extends ReferenceClient {
    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private String phone;

    @Enumerated(EnumType.ORDINAL)
    private TypePhone typePhone;

    @JsonBackReference
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Client client;
}
