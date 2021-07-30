import { useState } from "react";
import { NewFabricModal } from "../NewFabricModal/newFabricModal";
import { Button } from "../../Button/button";

export function FabricHeader() {
    const [isNewFabricModalOpen, setIsNewFabricModalOpen] = useState(false);

    function handleOpenNewClothModal() {
        setIsNewFabricModalOpen(true);
    };

    function handleCloseNewFabricModal() {
        setIsNewFabricModalOpen(false);
    };

    return (
        <>
            <Button onClick={handleOpenNewClothModal}>
                Cadastrar novo tecido no estoque
            </Button>

            <NewFabricModal
                isOpen={isNewFabricModalOpen}
                onRequestClose={handleCloseNewFabricModal}
            />
        </>
    );
}