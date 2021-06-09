import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { ActiveLink } from '../ActiveLink'

import styles from './styles.module.scss';


export function Header() {

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
            </div>
        </header>
    )

}