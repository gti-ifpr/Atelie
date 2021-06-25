import { useState } from "react";
import { NewScheduleModal } from "../NewScheduleModal";
import { Button } from "../../Button";

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

                <Button type="button" onClick={handleOpenNewClientModal}>
                    Cadastrar Na Agenda
                </Button>
            </div>

            <NewScheduleModal
                isOpen={isNewClientModalOpen}
                onRequestClose={handleCloseNewClientModal}
            />
        </>
    )
}