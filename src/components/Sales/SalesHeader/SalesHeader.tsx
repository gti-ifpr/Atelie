import { useState } from "react";
import { NewSalesModal } from "../NewSalesModal/newSalesModal";
import { Button } from "../../Button/button";

export function SalesHeader() {
    const [isNewSalesModalOpen, setIsNewSalesModalOpen] = useState(false);

    function handleOpenNewSalesModal() {
        setIsNewSalesModalOpen(true);
    }

    function handleCloseNewSalesModal() {
        setIsNewSalesModalOpen(false);
    }

    return (
        <>
            <Button type="button" onClick={handleOpenNewSalesModal}>
                Cadastrar Nova Venda
            </Button>

            <NewSalesModal
                isOpen={isNewSalesModalOpen}
                onRequestClose={handleCloseNewSalesModal}
            />
        </>
    )
}