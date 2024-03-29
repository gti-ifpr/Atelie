import { createContext, useEffect, useState, ReactNode, useContext } from 'react'
import { api } from '../services/api';

import { ClientContextData, ClientInput, ClientProviderProps } from '../types/client'

const ClientContext = createContext<ClientContextData>(
    {} as ClientContextData
);

export function ClientProvider({ children }: ClientProviderProps) {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        api.get("/clients").then((response) => setClients(response.data));
    }, []);

    async function createClient(client: ClientInput) {
        const { data } = await api.post("/clients", client);

        setClients([
            ...clients,
            data,
        ]);
    }

    return (
        <ClientContext.Provider value={{ clients, createClient }}>
            {children}
        </ClientContext.Provider>
    )
}

export function useClient() {
    const context = useContext(ClientContext);

    return context;
}