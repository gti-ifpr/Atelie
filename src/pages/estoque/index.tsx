import Head from "next/head";
import { ClothingCollectionHeader } from "../../components/ClothingCollection/ClothingCollectionHeader/clothingCollectionHeader";

type ClothingCollection = {
    id: number;
    nome: string;
}

export default function Stock() {

    return (
        <>
            <Head>
                <title>Estoque | Artha</title>
            </Head>

            <main>
                <ClothingCollectionHeader />

                <h1>Lista de roupas em estoque</h1>
            </main>
        </>
    );
}