import Modal from "react-modal";
import { FiX } from "react-icons/fi";
import { useState, FormEvent } from "react";

import styles from "./styles.module.scss";
import React from "react";
import { useAviamento } from "../../../hooks/useAviamento";

type NewScheduleModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
};


export function NewAviamentoModal({
    isOpen,
    onRequestClose,
}: NewScheduleModalProps) {
    const [nome, setNome] = useState("");
    const [fornecedor, setFornecedor] = useState("");
    const [referencia, setReferencia] = useState("");
    const [quantidade, setQuantidade] = useState(0);

    const { createAviamento } = useAviamento();

    async function handleCreateNewSchedule(event: FormEvent) {
        event.preventDefault();

        await createAviamento({
            nome: nome,
            fornecedor: fornecedor,
            referencia: referencia
        }, {
            quantidade: quantidade,
            reserva: 0
        })

        onRequestClose();

        setNome("");
        setFornecedor("");
        setReferencia("");
        setQuantidade(0);
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
                <h1>Cadastrar Novo Aviamento</h1>

                <form autoComplete="off" onSubmit={handleCreateNewSchedule}>
                    <div className={styles.contentContainer}>
                        <span>Nome do Aviamento:</span>
                        <input
                            required
                            placeholder="Nome"
                            value={nome}
                            onChange={(event) => setNome(event.target.value)}
                        />
                        <span>Fornecedor:</span>
                        <input
                            required
                            placeholder="Fornecedor"
                            value={fornecedor}
                            onChange={(event) => setFornecedor(event.target.value)}
                        />
                        <span>Referência:</span>
                        <input
                            required
                            placeholder="Referência"
                            value={referencia}
                            onChange={(event) => setReferencia(event.target.value)}
                        />
                        <span>Quantidade:</span>
                        <input
                            required
                            placeholder="0.0 m"
                            value={quantidade}
                            type="number"
                            onChange={(event) => setQuantidade(Number(event.target.value))}
                        />
                        <button type="submit">Cadastrar Aviamento</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
