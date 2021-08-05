import { FormEvent, useState } from 'react';
import Modal from 'react-modal'

import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

import { FiX } from 'react-icons/fi';

import styles from './styles.module.scss';
import { useBudged } from '../../../hooks/useBudged';
import { useTechnicalFile } from '../../../hooks/useTechnicalFile';

type Budged = {
    cliente: number;
    orcamento: number
}

type NewTechnicalFileModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTechnicalFileModal({ isOpen, onRequestClose }: NewTechnicalFileModalProps) {
    const [desenho, setDesenho] = useState('')
    const [selectedBudged, setSelectedBudged] = useState(null);
    const [quantidadeDeTecido, setQuantidadeDeTecido] = useState(0);
    const { budgeds } = useBudged();
    const { createTechnicalFile } = useTechnicalFile();


    async function handleCreateNewClient(event: FormEvent) {
        event.preventDefault();

        await createTechnicalFile({
            cliente: selectedBudged.cliente,
            orcamento: selectedBudged.orcamento,
            desenho: 'string',
            quantidadeTecido: quantidadeDeTecido
        })

        onRequestClose();

        setSelectedBudged(null);
        setDesenho('');
        setQuantidadeDeTecido(0);

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
                        value={selectedBudged}
                        onChange={(_, budged: Budged) => {
                            setSelectedBudged(budged);
                        }}
                        id="combo-box-demo"
                        options={budgeds}
                        getOptionLabel={(budged) => `${budged.cliente} ${budged.orcamento}`}
                        renderOption={(budged) => `${budged.cliente} (R$ ${budged.orcamento})`}
                        style={{ width: "100%" }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Orçamento"
                                variant="outlined"
                                required
                            />
                        )}
                    />

                    <span>Desenho: </span>
                    <input
                        type="string"
                        placeholder="Desenho"
                        value={desenho}
                        onChange={event => setDesenho(event.target.value)}
                    />
                    <span>Quantidade De Tecido: </span>
                    <input
                        type="string"
                        placeholder="Desenho"
                        value={quantidadeDeTecido}
                        onChange={event => setQuantidadeDeTecido(Number(event.target.value))}
                    />
                    <button type="submit">
                        Cadastrar Ficha Técnica
                    </button>
                </form>
            </div>
        </Modal>
    )
}