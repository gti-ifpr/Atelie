import { useState } from "react";
import { NewClientModal } from "../NewClientModal";

export function Header() {
    const [isNewJobModalOpen, setIsNewJobModalOpen] = useState(false);

    function handleOpenNewJobModal() {
        setIsNewJobModalOpen(true);
    }

    function handleCloseNewJobModal() {
        setIsNewJobModalOpen(false);
    }

    return (

        <NewClientModal
            isOpen={isNewJobModalOpen}
            onRequestClose={handleCloseNewJobModal}
        />
    )
}