import { useState } from "react";
import { NewBudgedModal } from "../NewBudgetModal/newBudgedModal";

import styles from './styles.module.scss'

export function BudgedHeader() {
    const [isNewBudgetModalOpen, setIsNewBudgetModalOpen] = useState(false);

    function handleOpenNewBudgetModal() {
        setIsNewBudgetModalOpen(true);
    }

    function handleCloseNewBudgetModal() {
        setIsNewBudgetModalOpen(false);
    }

    return (
        <>
            <div className={styles.contentContainer}>
                <button type="button" onClick={handleOpenNewBudgetModal}>
                    Cadastrar Orçamento
                </button>
            </div>
            <NewBudgedModal
                isOpen={isNewBudgetModalOpen}
                onRequestClose={handleCloseNewBudgetModal}
            />
        </>
    )
}