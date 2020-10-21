package com.evaluation.api.repository;

import com.evaluation.api.model.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

    Optional<Client> findByNameAndCpfAllIgnoreCase(String name, String cpf);

    Page<Client> findAllByNameContaining(String name, Pageable pageable);
}
