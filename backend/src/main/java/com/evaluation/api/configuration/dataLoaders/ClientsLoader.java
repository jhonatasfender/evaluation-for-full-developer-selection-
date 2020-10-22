package com.evaluation.api.configuration.dataLoaders;

import com.evaluation.api.model.*;
import com.evaluation.api.service.ClientService;
import com.github.javafaker.Faker;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.Array;
import java.util.*;

@Component
public class ClientsLoader implements ApplicationListener<ContextRefreshedEvent> {

    private boolean alreadySetup = false;
    private ClientService clientService;
    private Faker faker;


    public ClientsLoader(ClientService clientService) {
        this.clientService = clientService;
        this.faker = new Faker(new Locale("pt-BR"));
    }

    // API
    @Override
    @Transactional
    public void onApplicationEvent(final ContextRefreshedEvent event) {
        if (alreadySetup) return;

        //region Clients
        //===============================================================================
        for (int i = 0; i < 40; i++) {
            Set<Address> address = new HashSet<>();
            Set<Phone> phones = new HashSet<>();
            Set<Email> emails = new HashSet<>();

            Client client = createClientsIfNotFound(new Client(
                null,
                faker.name().fullName().replace(".", ""),
                faker.number().digits(11),
                address,
                phones,
                emails
            ));

            for (int j = 0; j < 3; j++) {
                address.add(new Address(
                    null,
                    Integer.valueOf(faker.number().digits(8)),
                    faker.address().streetAddress(),
                    faker.address().cityName(),
                    faker.address().city(),
                    faker.address().stateAbbr(),
                    client
                ));
            }
            for (int x = 0; x < 3; x++) {
                phones.add(new Phone(
                    null,
                    faker.phoneNumber().cellPhone(),
                    TypePhone.CELLULAR,
                    client
                ));
            }
            for (int a = 0; a < 3; a++) {
                emails.add(new Email(null, faker.internet().emailAddress(), client));
            }
            createClientsIfNotFound(client);
        }

        //===============================================================================
        //endregion

        alreadySetup = true;
    }

    @Transactional
    Client createClientsIfNotFound(Client client) {
        Optional<Client> find = clientService.findByNameAndCpfAllIgnoreCase(
            client.getName(), client.getCpf()
        );
        if (find.isEmpty())
            clientService.save(client);
        return client;
    }

}
