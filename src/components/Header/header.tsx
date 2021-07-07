import { useState } from 'react';
import { ActiveLink } from '../ActiveLink'
import { NewJobModal } from '../NewJobModal/newJobModal';
import { Button } from '../Button/button'

import styles from './styles.module.scss';

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
                    <ActiveLink activeClassName={styles.active} href="/agenda">
                        <a>Agenda</a>
                    </ActiveLink>
                    <ActiveLink activeClassName={styles.active} href="/clientes">
                        <a>Clientes</a>
                    </ActiveLink>
                    <ActiveLink activeClassName={styles.active} href="/estoque">
                        <a>Estoque</a>
                    </ActiveLink>
                    <ActiveLink activeClassName={styles.active} href="/fornecedor">
                        <a>Fornecedor</a>
                    </ActiveLink>
                </nav>

                <Button type="button" onClick={handleOpenNewJobModal}>
                    Nova Prova
                </Button>

                <NewJobModal
                    isOpen={isNewJobModalOpen}
                    onRequestClose={handleCloseNewJobModal}
                />
            </div>
        </header>
    )

}