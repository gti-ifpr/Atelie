import Head from "next/head";
import { BudgedHeader } from "../../components/Budget/BudgetHeader/budgedHeader";
import { useBudged } from "../../hooks/useBudged";

export default function Orcamento() {
    const { budgeds } = useBudged();

    return (
        <>
            <Head>
                <title>Orçamento | Artha</title>
            </Head>

            <main>
                <BudgedHeader />

                {budgeds.map(budged => (
                    <div>
                        <p>{budged.cliente}</p>
                        <p>{budged.orcamento}</p>
                    </div>
                ))}
            </main>
        </>
    );
}