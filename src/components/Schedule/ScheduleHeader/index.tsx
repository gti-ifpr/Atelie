import { useState } from "react";
import { NewScheduleModal } from "../NewScheduleModal";

import styles from './styles.module.scss';

export function ScheduleHeader() {
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

                <button type="button" onClick={handleOpenNewClientModal}>
                    Cadastrar Na Agenda
                </button>
            </div>
            <NewScheduleModal
                isOpen={isNewClientModalOpen}
                onRequestClose={handleCloseNewClientModal}
            />
        </>
    )
}