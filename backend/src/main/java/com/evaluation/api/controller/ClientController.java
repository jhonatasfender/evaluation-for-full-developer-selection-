package com.evaluation.api.controller;

import com.evaluation.api.model.Client;
import com.evaluation.api.service.ClientMatTableDataSourceService;
import com.evaluation.api.service.ClientService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/client")
public class ClientController {
    private ClientService clientService;
    private ClientMatTableDataSourceService clientMatTableDataSourceService;

    public ClientController(
        ClientService clientService,
        ClientMatTableDataSourceService clientMatTableDataSourceService
    ) {
        this.clientService = clientService;
        this.clientMatTableDataSourceService = clientMatTableDataSourceService;
    }

    @GetMapping
    public ResponseEntity<Page<Client>> getAllClients(
        @RequestParam(name = "active", defaultValue = "id") String active,
        @RequestParam(name = "order", defaultValue = "asc") String order,
        @RequestParam(name = "search") String search,
        @RequestParam(name = "page", defaultValue = "0") Integer page,
        @RequestParam(name = "pageSize", defaultValue = "10") Integer size
    ) {
        return ResponseEntity.ok(clientMatTableDataSourceService.get(active, order, search, page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> getClients(@PathVariable Long id) {
        Optional<Client> client = clientService.findById(id);

        if (client.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(client.get());
    }

    @PostMapping
    public ResponseEntity<Client> saveClient(
        @RequestBody @Valid Client client
    ) {
        clientService.save(client);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}").buildAndExpand(client.getId())
            .toUri();
        return ResponseEntity.created(location).body(client);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Client> updateClient(
        @PathVariable("id") Long id,
        @RequestBody @Valid Client client
    ) {
        clientService.update(client);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}").buildAndExpand(client.getId())
            .toUri();
        return ResponseEntity.created(location).body(client);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Client> deleteClient(@PathVariable("id") Long id) {
        Optional<Client> authorToDelete = clientService.findById(id);
        if (!authorToDelete.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        clientService.delete(id);
        return ResponseEntity.ok(authorToDelete.get());
    }

}
