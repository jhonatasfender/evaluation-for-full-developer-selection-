package com.evaluation.api.service;

import com.evaluation.api.model.Client;
import com.evaluation.api.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ClientMatTableDataSourceService {
    private ClientRepository clientRepository;

    @Autowired
    public ClientMatTableDataSourceService(
        ClientRepository clientRepository
    ) {
        this.clientRepository = clientRepository;
    }

    public Page<Client> get(String active, String order, String search, Integer page, Integer size) {
        return clientRepository.findAllByNameContaining(
            search,
            PageRequest.of(
                page == 0 ? page : page - 1,
                size,
                order.equals("desc") ? Sort.by(active).descending() : Sort.by(active).ascending()
            )
        );
    }
}
