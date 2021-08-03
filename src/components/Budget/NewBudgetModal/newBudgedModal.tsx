import { FormEvent, useState } from 'react';
import Modal from 'react-modal'

import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

import { FiX } from 'react-icons/fi';
import { useClient } from '../../../hooks/useClient';

import styles from './styles.module.scss';
import { useBudged } from '../../../hooks/useBudged';

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

type NewClientModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewBudgedModal({ isOpen, onRequestClose }: NewClientModalProps) {
    const [orcamento, setOrcamento] = useState(0)
    const [selectedClient, setSelectedClient] = useState(null);
    const { clients } = useClient();
    const { createBudged } = useBudged();


    async function handleCreateNewClient(event: FormEvent) {
        event.preventDefault();

        await createBudged({
            cliente: selectedClient.id,
            orcamento: orcamento
        })

        onRequestClose();

    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            ariaHideApp={false}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <FiX color="#737380" size="2rem" className="react-modal-close" onClick={() => onRequestClose()} />

            <div className={styles.modal}>
                <h1>Cadastrar Orçamento</h1>

                <form onSubmit={handleCreateNewClient}>
                    <Autocomplete
                        value={selectedClient}
                        onChange={(_, client: Client) => {
                            setSelectedClient(client);
                        }}
                        id="combo-box-demo"
                        options={clients as Client[]}
                        getOptionLabel={(client) => `${client.nome} ${client.sobrenome}`}
                        renderOption={(client) => `${client.nome} ${client.sobrenome}`}
                        style={{ width: "100%" }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Cliente"
                                variant="outlined"
                                required
                            />
                        )}
                    />

                    <span>Orçamento: </span>
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Orçamento"
                        value={orcamento}
                        onChange={event => setOrcamento(Number(event.target.value))}
                    />
                    <button type="submit">
                        Cadastrar Orçamento
                    </button>
                </form>
            </div>
        </Modal>
    )
}