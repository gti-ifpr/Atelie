import { useState } from "react";
import { NewClientModal } from "../NewClientModal/newClientModal";

import styles from './styles.module.scss'

export function ClientHeader() {
    const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);

    function handleOpenNewClientModal() {
        setIsNewClientModalOpen(true);
    }

    function handleCloseNewClientModal() {
        setIsNewClientModalOpen(false);
    }

    return (
        <>
            <div className={styles.contentContainer}>
                <input type="text" />
                <button type="button" onClick={handleOpenNewClientModal}>
                    Cadastrar Novo Cliente
                </button>
            </div>
            <NewClientModal
                isOpen={isNewClientModalOpen}
                onRequestClose={handleCloseNewClientModal}
            />
        </>
    )
}