import { useState } from "react";
import { NewAviamentoModal } from "../NewAviamentoModal/newAviamentoModal";
import { Button } from "../../Button/button";

export function AviamentoHeader() {
    const [isNewAviamentoModalOpen, setIsNewAviamentoModalOpen] = useState(false);

    function handleOpenNewAviamentoModal() {
        setIsNewAviamentoModalOpen(true);
    };

    function handleCloseNewAviamentoModal() {
        setIsNewAviamentoModalOpen(false);
    };

    return (
        <>
            <Button onClick={handleOpenNewAviamentoModal}>
                Cadastrar novo aviamento no estoque
            </Button>

            <NewAviamentoModal
                isOpen={isNewAviamentoModalOpen}
                onRequestClose={handleCloseNewAviamentoModal}
            />
        </>
    );
}