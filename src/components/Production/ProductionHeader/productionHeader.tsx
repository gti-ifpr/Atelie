import { useState } from "react";
import { NewProductionModal } from "../NewProductionModal/NewProductionModal";
import { Button } from "../../Button/button";

import styles from './styles.module.scss';

export function ProductionHeader() {
    const [isNewProductionModalOpen, setIsNewProductionModalOpen] = useState(false);

    function handleOpenNewProductionModal() {
        setIsNewProductionModalOpen(true);
    }

    function handleCloseNewProductionModal() {
        setIsNewProductionModalOpen(false);
    }

    return (
        <>
            <div className={styles.contentContainer}>

                <Button type="button" onClick={handleOpenNewProductionModal}>
                    Cadastrar Produção
                </Button>
            </div>

            <NewProductionModal
                isOpen={isNewProductionModalOpen}
                onRequestClose={handleCloseNewProductionModal}
            />
        </>
    )
}