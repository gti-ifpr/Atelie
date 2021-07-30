import Modal from "react-modal";
import { FiX } from "react-icons/fi";
import { useState, FormEvent } from "react";

import styles from "./styles.module.scss";
import React from "react";
import { useFabric } from "../../../hooks/useFabric";

type NewScheduleModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
};


export function NewFabricModal({
    isOpen,
    onRequestClose,
}: NewScheduleModalProps) {
    const [nome, setNome] = useState("");
    const [fabricante, setFabricante] = useState("");
    const [referenciaDoFabricante, setReferenciaDoFabricante] = useState("");
    const [quantidade, setQuantidade] = useState(0);
    const [largura, setLargura] = useState(0);

    const { createFabric } = useFabric();

    async function handleCreateNewSchedule(event: FormEvent) {
        event.preventDefault();

        await createFabric({
            nome: nome,
            fabricante: fabricante,
            referenciaDoFabricante: referenciaDoFabricante,
            largura: largura,
        }, {
            quantidade: quantidade,
        })

        onRequestClose();

        setNome("");
        setFabricante("");
        setReferenciaDoFabricante("");
        setQuantidade(0);
        setLargura(0);
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            ariaHideApp={false}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <FiX
                color="#737380"
                size="2rem"
                className="react-modal-close"
                onClick={() => onRequestClose()}
            />
            <div className={styles.modal}>
                <h1>Cadastrar Nova Coleção</h1>

                <form autoComplete="off" onSubmit={handleCreateNewSchedule}>
                    <div className={styles.contentContainer}>
                        <span>Nome do Tecido:</span>
                        <input
                            required
                            placeholder="Nome"
                            value={nome}
                            onChange={(event) => setNome(event.target.value)}
                        />
                        <span>Fabricante:</span>
                        <input
                            required
                            placeholder="Fabricante"
                            value={fabricante}
                            onChange={(event) => setFabricante(event.target.value)}
                        />
                        <span>Referência do Fabricante:</span>
                        <input
                            required
                            placeholder="Referência"
                            value={referenciaDoFabricante}
                            onChange={(event) => setReferenciaDoFabricante(event.target.value)}
                        />
                        <span>Quantidade:</span>
                        <input
                            required
                            placeholder="0.0 m"
                            value={quantidade}
                            type="number"
                            onChange={(event) => setQuantidade(Number(event.target.value))}
                        />
                        <span>Largura:</span>
                        <input
                            required
                            type="number"
                            placeholder="Largura"
                            value={largura}
                            onChange={(event) => setLargura(Number(event.target.value))}
                        />
                        <button type="submit">Cadastrar Tecido</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
