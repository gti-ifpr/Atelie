import { useState } from "react";
import { NewTechnicalFileModal } from "../NewTechnicalFileModal/newTechnicalFileModal";

import styles from './styles.module.scss'

export function TechnicalFileHeader() {
    const [isNewTechnicalFileModalOpen, setIsNewTechnicalFileModalOpen] = useState(false);

    function handleOpenNewTechnicalFileModal() {
        setIsNewTechnicalFileModalOpen(true);
    }

    function handleCloseNewTechnicalFileModal() {
        setIsNewTechnicalFileModalOpen(false);
    }

    return (
        <>
            <div className={styles.contentContainer}>
                <button type="button" onClick={handleOpenNewTechnicalFileModal}>
                    Cadastrar Ficha Técnica
                </button>
            </div>
            <NewTechnicalFileModal
                isOpen={isNewTechnicalFileModalOpen}
                onRequestClose={handleCloseNewTechnicalFileModal}
            />
        </>
    )
}