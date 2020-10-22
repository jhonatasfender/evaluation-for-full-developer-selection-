const HOST = 'http://localhost:8080';

export const CONSTANST = {
    permissions: {},
    routes: {
        authorization: {
            login: HOST + '/auth',
            logout: HOST + '/auth/logout'
        },
        client: {
            list: HOST + '/client',
            delete: HOST + '/client/:id',
            save: HOST + '/client',
            get: HOST + '/client/:id'
        },
        user: {}
    },
    lang: {},
    session: {},
    parameters: {}
};
