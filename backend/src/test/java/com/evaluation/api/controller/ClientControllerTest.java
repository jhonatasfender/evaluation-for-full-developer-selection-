package com.evaluation.api.controller;

import com.evaluation.api.configuration.dataloaders.ClientsLoader;
import com.evaluation.api.model.*;
import com.evaluation.api.service.ClientMatTableDataSourceService;
import com.evaluation.api.service.ClientService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.*;

import static org.mockito.Mockito.*;

class ClientControllerTest {
    @Mock
    ClientService clientService;
    @Mock
    ClientMatTableDataSourceService clientMatTableDataSourceService;
    @InjectMocks
    ClientController clientController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testGetAllClients() {
        List<Client> clients = Arrays.asList(new Client());
        Page<Client> out = new PageImpl(clients);
        when(clientMatTableDataSourceService.get(anyString(), anyString(), anyString(), anyInt(), anyInt())).thenReturn(out);

        ResponseEntity<Page<Client>> result = clientController.getAllClients("active", "order", "search", Integer.valueOf(0), Integer.valueOf(0));
        Assertions.assertEquals(ResponseEntity.ok(out), result);
    }

    @Test
    void testGetClientsIsEmpty() {
        when(clientService.findById(anyLong())).thenReturn(Optional.empty());

        ResponseEntity<Client> result = clientController.getClients(Long.valueOf(1));
        Assertions.assertEquals(ResponseEntity.notFound().build(), result);
    }

    @Test
    void testGetClients() {
        Optional<Client> out = Optional.of(mockClient());
        when(clientService.findById(anyLong())).thenReturn(out);

        ResponseEntity<Client> result = clientController.getClients(Long.valueOf(1));
        Assertions.assertEquals(ResponseEntity.ok(out.get()), result);
    }

    Client mockClient() {
        ClientsLoader clientLoader = new ClientsLoader(clientService);
        return clientLoader.mock();
    }

    @Test
    void testSaveClient() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Client out = mockClient();

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}").buildAndExpand(out.getId())
            .toUri();

        ResponseEntity<Client> result = clientController.saveClient(out);
        Assertions.assertEquals(ResponseEntity.created(location).body(out), result);
    }

    @Test
    void testUpdateClient() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Client out = mockClient();

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}").buildAndExpand(out.getId())
            .toUri();

        ResponseEntity<Client> result = clientController.updateClient(out.getId(), out);
        Assertions.assertEquals(ResponseEntity.created(location).body(out), result);
    }

    @Test
    void testDeleteClientNotFound() {
        when(clientService.findById(anyLong())).thenReturn(Optional.empty());

        ResponseEntity<Client> result = clientController.deleteClient(Long.valueOf(1));
        Assertions.assertEquals(ResponseEntity.notFound().build(), result);
    }

    @Test
    void testDeleteClient() {
        Optional<Client> out = Optional.of(new Client());
        when(clientService.findById(anyLong())).thenReturn(out);

        ResponseEntity<Client> result = clientController.deleteClient(Long.valueOf(1));
        Assertions.assertEquals(ResponseEntity.ok(out.get()), result);
    }
}
