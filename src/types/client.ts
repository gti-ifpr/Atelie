import { ReactNode } from "react";

export type Client = {
    id: number;
    nome: string;
    sobrenome: string;
    email: string;
    telefone: string;
    endereco: {
        endereco: string;
        cidade: string;
        cep: string;
    };
};

export type ClientInput = Omit<Client, 'id'>

export type ClientProviderProps = {
    children: ReactNode;
}

export type ClientContextData = {
    clients: Client[];
    createClient: (client: ClientInput) => Promise<void>;
}