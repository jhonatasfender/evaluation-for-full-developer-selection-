package com.evaluation.api.utilities;

import com.evaluation.api.model.Client;
import com.evaluation.api.model.ReferenceClient;

import java.util.Set;

public class AttrID<T extends ReferenceClient> {

    public void attrClientId(Set<T> stream, Client client) {
        stream.stream().map(ob -> {
            ob.setClient(new Client(client.getId()));
            return ob;
        });
    }

}
