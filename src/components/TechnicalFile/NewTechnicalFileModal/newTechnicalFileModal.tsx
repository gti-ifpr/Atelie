import { FormEvent, useState } from 'react';
import Modal from 'react-modal'

import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

import { FiX } from 'react-icons/fi';

import styles from './styles.module.scss';
import { useBudged } from '../../../hooks/useBudged';
import { useFabric } from '../../../hooks/useFabric';
import { useTechnicalFile } from '../../../hooks/useTechnicalFile';

type Budged = {
    cliente: number;
    orcamento: number
}

type Fabric = {
    nome: string;
    fabricante: string;
    referenciaDoFabricante: string;
    largura: number;
}

type NewTechnicalFileModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTechnicalFileModal({ isOpen, onRequestClose }: NewTechnicalFileModalProps) {
    const [desenho, setDesenho] = useState('')
    const [selectedBudged, setSelectedBudged] = useState(null);
    const [selectedFabric, setSelectedFabric] = useState(null);
    const [quantidadeDeTecido, setQuantidadeDeTecido] = useState(0);
    const [nome, setNome] = useState('');

    const { budgeds } = useBudged();
    const { fabrics, addReserve, fabricStocks } = useFabric();
    const { createTechnicalFile } = useTechnicalFile();


    async function handleCreateNewClient(event: FormEvent) {
        event.preventDefault();

        await fabricStocks.map(stock => {
            if (selectedFabric.id === stock.id) {
                addReserve({ stockId: stock.id, amount: stock.reserva + quantidadeDeTecido })
            }
        })


        await createTechnicalFile({
            nome: nome,
            cliente: selectedBudged.cliente,
            orcamento: selectedBudged.orcamento,
            desenho: desenho,
            tipoTecido: selectedFabric.nome,
            idTecido: selectedFabric.id,
            quantidadeTecido: quantidadeDeTecido
        })

        onRequestClose();

        setSelectedBudged(null);
        setSelectedFabric(null);
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
                    <span>Nome do vestido: </span>
                    <input
                        type="string"
                        placeholder="Nome"
                        value={nome}
                        onChange={event => setNome(event.target.value)}
                    />

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

                    <Autocomplete
                        value={selectedFabric}
                        onChange={(_, fabric: Fabric) => {
                            setSelectedFabric(fabric);
                        }}
                        id="combo-box-demo"
                        options={fabrics}
                        getOptionLabel={(fabric) => `${fabric.nome}`}
                        renderOption={(fabric) => `${fabric.nome}`}
                        style={{ width: "100%" }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Tipo do Tecido"
                                variant="outlined"
                                required
                            />
                        )}
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