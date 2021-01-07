package com.evaluation.api.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Client {
    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String cpf;

    @JsonManagedReference
    @OneToMany(
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        mappedBy = "client"
    )
    private Set<Address> address;

    @JsonManagedReference
    @NotNull // Colocar os not null nos DTOs
    @OneToMany(
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        mappedBy = "client"
    )
    private Set<Phone> phones;

    @JsonManagedReference // depois que criar os DTOs remover essas annotations
    @NotNull
    @OneToMany(
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        mappedBy = "client"
    )
    private Set<Email> emails;

    public Client(Long id) {
        this.id = id;
    }

    // verificar
    public Client(Client client) {
        this.id = client.getId();
        this.name = client.getName();
        this.cpf = client.getCpf();
        this.address = client.getAddress();
        this.emails = client.getEmails();
        this.phones = client.getPhones();
    }
}
