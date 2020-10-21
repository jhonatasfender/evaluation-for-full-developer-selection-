package com.evaluation.api.controller;

import com.evaluation.api.exceptions.BindingErrorsResponse;
import com.evaluation.api.model.Client;
import com.evaluation.api.service.ClientMatTableDataSourceService;
import com.evaluation.api.service.ClientService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import java.util.List;
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
        return new ResponseEntity<>(
            clientMatTableDataSourceService.get(active, order, search, page, size),
            HttpStatus.OK
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> getClients(@PathVariable Long id) {
        return clientService
            .findById(id)
            .map(author -> new ResponseEntity<>(author, HttpStatus.OK))
            .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Client> saveClient(
        @RequestBody @Valid Optional<Client> client,
        BindingResult bindingResult,
        UriComponentsBuilder uriComponentsBuilder
    ) {
        BindingErrorsResponse errors = new BindingErrorsResponse();
        HttpHeaders headers = new HttpHeaders();
        if (bindingResult.hasErrors() || client.isEmpty()) {
            errors.addAllErrors(bindingResult);
            headers.add("errors", errors.toJSON());
            return new ResponseEntity<>(headers, HttpStatus.BAD_REQUEST);
        }
        clientService.save(client.get());
        headers.setLocation(uriComponentsBuilder.path("/client/{id}").buildAndExpand(client.get().getId()).toUri());
        return new ResponseEntity<>(client.get(), headers, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Client> updateClient(
        @PathVariable("id") Long id,
        @RequestBody @Valid Optional<Client> client,
        BindingResult bindingResult
    ) {
        Optional<Client> currentAuthor = clientService.findById(id);
        BindingErrorsResponse errors = new BindingErrorsResponse();
        HttpHeaders headers = new HttpHeaders();
        if (bindingResult.hasErrors() || client.isEmpty()) {
            errors.addAllErrors(bindingResult);
            headers.add("errors", errors.toJSON());
            return new ResponseEntity<>(headers, HttpStatus.BAD_REQUEST);
        }
        if (!currentAuthor.isPresent())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        clientService.update(client.get());
        return new ResponseEntity<>(client.get(), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Client> deleteClient(@PathVariable("id") Long id) {
        Optional<Client> authorToDelete = clientService.findById(id);
        if (!authorToDelete.isPresent())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        clientService.delete(id);
        return new ResponseEntity<>(authorToDelete.get(), HttpStatus.OK);
    }

}
