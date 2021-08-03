import Head from "next/head";
import { BudgedHeader } from "../../components/Budget/BudgetHeader/budgedHeader";
import { useBudged } from "../../hooks/useBudged";

import styles from './styles.module.scss'

export default function Orcamento() {
    const { budgeds } = useBudged();

    return (
        <>
            <Head>
                <title>Orçamento | Artha</title>
            </Head>

            <main className={styles.contentContainer}>
                <BudgedHeader />

                <div className={styles.cardContainer}>
                    {budgeds.map(budged => (
                        <div key={budged.id} className={styles.card}>
                            <div>
                                <span>Cliente: </span>
                                <p>{budged.cliente}</p>
                            </div>
                            <div>
                                <span>Orçamento: </span>
                                <p>R$ {budged.orcamento}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}