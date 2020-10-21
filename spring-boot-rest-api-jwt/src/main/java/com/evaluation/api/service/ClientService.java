package com.evaluation.api.service;

import com.evaluation.api.model.Client;
import com.evaluation.api.repository.AddressRepository;
import com.evaluation.api.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ClientService {

    private ClientRepository clientRepository;
    private AddressRepository addressRepository;

    @Autowired
    public ClientService(
        ClientRepository clientRepository,
        AddressRepository addressRepository
    ) {
        this.clientRepository = clientRepository;
        this.addressRepository = addressRepository;
    }

    public Optional<List<Client>> findAll() {
        return Optional.of(clientRepository.findAll());
    }

    public Optional<Client> findById(Long id) {
        return clientRepository.findById(id);
    }

    public Optional<Client> findByNameAndCpfAllIgnoreCase(String name, String cpf) {
        return clientRepository.findByNameAndCpfAllIgnoreCase(name, cpf);
    }

    public void save(Client client) {
        clientRepository.save(client);
    }

    public void update(Client client) {
        clientRepository.save(client);
    }

    public void delete(Long id) {
        clientRepository.deleteById(id);
    }

}
