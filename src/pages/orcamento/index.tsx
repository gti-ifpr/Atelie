import Head from "next/head";
import { BudgedHeader } from "../../components/Budget/BudgetHeader/budgedHeader";

export default function Orcamento() {
    return (
        <>
            <Head>
                <title>Orçamento | Artha</title>
            </Head>

            <main>
                <BudgedHeader />
            </main>
        </>
    );
}