import { useState, FormEvent, useEffect } from "react";

import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import { NewClientModal } from "../../Client/NewClientModal/newClientModal";

import styles from "./styles.module.scss";
import React from "react";

import { useCart } from "../../../hooks/useCart";
import { useClient } from "../../../hooks/useClient";
import { useSale } from "../../../hooks/useSale";
import { useCloth } from "../../../hooks/useCloth";

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


export function FinalizeSale() {

    const { clients } = useClient();
    const { cart, setCartEmpty } = useCart();
    const { updateClothInStock, stocks } = useCloth();
    const { createSale } = useSale();

    const [selectedClient, setSelectedClient] = useState<Client>(null);

    async function handleCreateNewSale(event: FormEvent) {
        event.preventDefault();
        cart.map(cloth => {
            stocks.map(stock => {
                if (stock.id === cloth.id) {
                    updateClothInStock({ stockId: cloth.id, amount: stock.quantidade - cloth.quantidade })
                }
            })
        })

        await setCartEmpty()

        await createSale({
            produtos: cart,
            cliente: selectedClient.id
        })

        setSelectedClient(null);
    }

    const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);

    function handleOpenNewClientModal() {
        setIsNewClientModalOpen(true);
    }

    function handleCloseNewClientModal() {
        setIsNewClientModalOpen(false);
    }

    return (
        <>
            <form onSubmit={handleCreateNewSale} className={styles.contentContainer}>
                <Autocomplete
                    value={selectedClient}
                    onChange={(_, client: Client) => {
                        setSelectedClient(client);
                    }}
                    id="combo-box-demo"
                    options={clients as Client[]}
                    getOptionLabel={(client) => `${client.nome} ${client.sobrenome}`}
                    renderOption={(client) => `${client.nome} ${client.sobrenome}`}
                    style={{ width: "35rem", margin: "1rem" }}
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

            <span className={styles.createNewClientSpan}>Cliente ainda não cadastrado? <button type="button" onClick={handleOpenNewClientModal}>Cadastrar cliente</button></span>

            <NewClientModal
                isOpen={isNewClientModalOpen}
                onRequestClose={handleCloseNewClientModal}
            />

        </>
    );
}
