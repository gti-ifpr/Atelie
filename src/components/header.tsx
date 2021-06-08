import Link from 'next/link';

import { AppBar, Toolbar } from '@material-ui/core';



export function Header() {
    return (
        <AppBar position='static'>
            <Toolbar>
                <header>
                    <nav>
                        <Link href="/">
                            <a>Página principal</a>
                        </Link>
                        <Link href="/estoque">
                            <a>Estoque</a>
                        </Link>
                        <Link href="/fornecedor">
                            <a>Fornecedor</a>
                        </Link>
                    </nav>
                </header>
            </Toolbar>
        </AppBar>
    )

}