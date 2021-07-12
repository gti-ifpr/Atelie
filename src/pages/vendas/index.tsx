import Head from "next/head";
import { SalesHeader } from "../../components/Sales/SalesHeader/SalesHeader";

export default function Stock() {
    return (
        <>
            <Head>
                <title>Vendas | Artha</title>
            </Head>

            <main>
                <SalesHeader />
            </main>
        </>
    );
}