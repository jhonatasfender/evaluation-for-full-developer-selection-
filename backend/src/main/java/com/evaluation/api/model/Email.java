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
public class Email {
    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    @javax.validation.constraints.Email
    private String email;

    @JsonBackReference
    @NotNull
    @ManyToOne(
        cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
        },
        targetEntity = Client.class
    )
    private Client client;
}
