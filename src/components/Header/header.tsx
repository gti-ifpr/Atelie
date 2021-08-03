import { useState } from 'react';
import { ActiveLink } from '../ActiveLink'
import { NewJobModal } from '../NewJobModal/newJobModal';
import { Button } from '../Button/button'
import React from 'react';
import Button1 from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import styles from './styles.module.scss';

export function Header() {
    const [isNewJobModalOpen, setIsNewJobModalOpen] = useState(false);

    function handleOpenNewJobModal() {
        setIsNewJobModalOpen(true);
    }

    function handleCloseNewJobModal() {
        setIsNewJobModalOpen(false);
    }

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
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
                    <ActiveLink activeClassName={styles.active} href="/orcamento">
                        <a>Orçamento</a>
                    </ActiveLink>
                    <ActiveLink activeClassName={styles.active} href="/vendas">
                        <a>Vendas</a>
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