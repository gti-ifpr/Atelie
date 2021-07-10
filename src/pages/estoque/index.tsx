import Head from "next/head";
import { ClothingCollectionHeader } from "../../components/ClothingCollection/ClothingCollectionHeader/clothingCollectionHeader";
import { useCloth } from "../../hooks/useCloth";

type ClothingCollection = {
    id: number;
    nome: string;
}

export default function Stock() {
    const { cloths } = useCloth()

    return (
        <>
            <Head>
                <title>Estoque | Artha</title>
            </Head>

            <main>
                <ClothingCollectionHeader />

                {cloths.map(cloth => {
                    return (
                        <h1>{cloth.nome} {cloth.colecao}</h1>
                    )
                })}
            </main>
        </>
    );
}