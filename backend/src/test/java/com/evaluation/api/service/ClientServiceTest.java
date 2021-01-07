package com.evaluation.api.service;

import com.evaluation.api.configuration.dataloaders.ClientsLoader;
import com.evaluation.api.model.Client;
import com.evaluation.api.repository.ClientRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.anyString;
import static org.mockito.Mockito.when;

class ClientServiceTest {
    @Mock
    ClientRepository clientRepository;
    @InjectMocks
    ClientService clientService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    Client mockClient() {
        ClientsLoader clientLoader = new ClientsLoader(clientService);
        return clientLoader.mock();
    }

    @Test
    void testFindAll() {
        List<Client> out = Arrays.asList(new Client());
        when(clientRepository.findAll()).thenReturn(out);

        List<Client> result = clientService.findAll();
        Assertions.assertEquals(out, result);
    }

    @Test
    void testFindById() {
        Optional<Client> out = Optional.of(new Client());
        when(clientRepository.findById(anyLong())).thenReturn(out);

        Optional<Client> result = clientService.findById(Long.valueOf(1));
        Assertions.assertEquals(out, result);
    }

    @Test
    void testFindByNameAndCpfAllIgnoreCase() {
        Optional<Client> out = Optional.of(new Client());
        when(clientRepository.findByNameAndCpfAllIgnoreCase(anyString(), anyString())).thenReturn(out);

        Optional<Client> result = clientService.findByNameAndCpfAllIgnoreCase("name", "cpf");
        Assertions.assertEquals(out, result);
    }

    @Test
    void testSave() {
        clientService.save(mockClient());
    }

    @Test
    void testUpdate() {
        clientService.update(mockClient());
    }

    @Test
    void testDelete() {
        clientService.delete(Long.valueOf(1));
    }
}
