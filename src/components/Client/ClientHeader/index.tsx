import { useState } from "react";
import { NewClientModal } from "../NewClientModal";

import styles from './styles.module.scss'

export function ClientHeader() {
    const [isNewJobModalOpen, setIsNewJobModalOpen] = useState(false);

    function handleOpenNewJobModal() {
        setIsNewJobModalOpen(true);
    }

    function handleCloseNewJobModal() {
        setIsNewJobModalOpen(false);
    }

    return (
        <>
            <div className={styles.contentContainer}>
                <input type="text" />
                <button type="button" onClick={handleOpenNewJobModal}>
                    Cadastrar Novo Cliente
                </button>
            </div>
            <NewClientModal
                isOpen={isNewJobModalOpen}
                onRequestClose={handleCloseNewJobModal}
            />
        </>
    )
}