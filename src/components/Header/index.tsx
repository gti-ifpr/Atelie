import { useState } from 'react';
import { ActiveLink } from '../ActiveLink'
import { NewJobModal } from '../NewJobModal';

import styles from './styles.module.scss';

type HeaderProps = {
    onOpenNewJobModal: () => void;
}

export function Header() {
    const [isNewJobModalOpen, setIsNewJobModalOpen] = useState(false);

    function handleOpenNewJobModal() {
        setIsNewJobModalOpen(true);
    }

    function handleCloseNewJobModal() {
        setIsNewJobModalOpen(false);
    }

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <nav>
                    <ActiveLink activeClassName={styles.active} href="/">
                        <a>Home</a>
                    </ActiveLink>
                    <ActiveLink activeClassName={styles.active} href="/estoque">
                        <a>Estoque</a>
                    </ActiveLink>
                    <ActiveLink activeClassName={styles.active} href="/fornecedor">
                        <a>Fornecedor</a>
                    </ActiveLink>
                </nav>

                <button type="button" onClick={handleOpenNewJobModal}>
                    Nova Prova
                </button>

                <NewJobModal
                    isOpen={isNewJobModalOpen}
                    onRequestClose={handleCloseNewJobModal}
                />
            </div>
        </header>
    )

}