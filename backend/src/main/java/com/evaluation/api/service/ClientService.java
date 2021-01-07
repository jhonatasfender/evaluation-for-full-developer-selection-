package com.evaluation.api.service;

import com.evaluation.api.model.Client;
import com.evaluation.api.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class ClientService {

    private ClientRepository clientRepository;

    @Autowired
    public ClientService(
        ClientRepository clientRepository
    ) {
        this.clientRepository = clientRepository;
    }

    public List<Client> findAll() {
        return clientRepository.findAll();
    }

    public Optional<Client> findById(Long id) {
        return clientRepository.findById(id);
    }

    public Optional<Client> findByNameAndCpfAllIgnoreCase(String name, String cpf) {
        return clientRepository.findByNameAndCpfAllIgnoreCase(name, cpf);
    }

    @Transactional
    public void save(Client client) {
        clientRepository.save(client);
    }

    @Transactional
    public void update(Client client) {
        clientRepository.save(client);
    }

    @Transactional
    public void delete(Long id) {
        clientRepository.deleteById(id);
    }

}
