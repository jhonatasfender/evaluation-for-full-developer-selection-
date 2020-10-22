package com.evaluation.api.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @Min(value = 3)
    @Max(value = 100)
    private String name;

    @NotNull
    private String cpf;

    @JsonManagedReference
    @OneToMany(
        fetch = FetchType.LAZY,
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        mappedBy = "client"
    )
    private Set<Address> address;

    @JsonManagedReference
    @NotNull
    @OneToMany(
        fetch = FetchType.LAZY,
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        mappedBy = "client"
    )
    private Set<Phone> phones;

    @JsonManagedReference
    @NotNull
    @OneToMany(
        fetch = FetchType.LAZY,
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        mappedBy = "client"
    )
    private Set<Email> emails;

    public Client(Long id) {
        this.id = id;
    }

    public Client(Client client) {
        this.id = client.getId();
        this.name = client.getName();
        this.cpf = client.getCpf();
        this.address = client.getAddress();
        this.emails = client.getEmails();
        this.phones = client.getPhones();
    }
}
