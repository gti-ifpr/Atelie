import { useState, FormEvent, useEffect } from "react";

import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

import styles from "./styles.module.scss";
import React from "react";

import { useCart } from "../../../hooks/useCart";
import { useClient } from "../../../hooks/useClient";

type Client = {
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

type Cloth = {
    id: number;
    nome: string;
    colecao: number;
    quantidade: number;
    tamanho: number;
};

type NewScheduleModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
};


export function FinalizeSale() {

    const { clients } = useClient();
    const [selectedClient, setSelectedClient] = useState<Client>(null);

    async function handleCreateNewSchedule(event: FormEvent) {
        event.preventDefault();
    }

    return (
        <form className={styles.contentContainer}>
            <Autocomplete
                value={selectedClient}
                onChange={(_, client: Client) => {
                    setSelectedClient(client);
                }}
                id="combo-box-demo"
                options={clients as Client[]}
                getOptionLabel={(client) => `${client.nome} ${client.sobrenome}`}
                renderOption={(client) => `${client.nome} ${client.sobrenome}`}
                style={{ width: "50%", margin: "1rem" }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Cliente"
                        variant="outlined"
                        required
                    />
                )}
            />
            <button
                type="submit"
            >
                Finalizar Venda
            </button>
        </form>
    );
}
