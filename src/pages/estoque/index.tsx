import Head from "next/head";
import { useEffect, FunctionComponent, useState } from "react";
import { ClothingCollectionHeader } from "../../components/ClothingCollection/ClothingCollectionHeader/clothingCollectionHeader";
import { useCloth } from "../../hooks/useCloth";
import { useFilterClothByCollection } from "../../hooks/useFilterClothByCollection";

import { MdAdd } from 'react-icons/md';
import { MdRemove } from 'react-icons/md';

import styles from './styles.module.scss'

type Cloth = {
    id: number;
    nome: string;
    colecao: number;
    tamanho: number;
}

type Stock = {
    id: number;
    quantidade: number;
}

const StockRow: FunctionComponent<{ stock: Stock }> = ({
    stock
}) => {
    return (
        <div className={styles.quantity}>
            <MdRemove
                color="#737380"
                size="1.75rem"
                className={styles.removeAndAddButtons}
                onClick={() => console.log('remover')}
            />
            <p>{stock.quantidade}</p>
            <MdAdd
                color="#737380"
                size="1.75rem"
                className={styles.removeAndAddButtons}
                onClick={() => console.log('adicionar')}
            />
        </div>
    )
}

const ClothRow: FunctionComponent<{ cloth: Cloth, stocks: Stock[] }> = ({
    cloth,
    stocks
}) => {
    return (
        <div className={styles.card}>
            <p>{cloth.nome}</p>
            <div className={styles.specificationsCard}>
                <div>
                    <span>Tamanho: </span>
                    <p>{cloth.tamanho}</p>
                </div>
                <div>
                    <span>Quantidade: </span>
                    {stocks.map((stock) => {
                        if (stock.id === cloth.id) {
                            return <StockRow key={stock.id} stock={stock} />
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

export default function Stock() {
    const { cloths, stocks } = useCloth()
    const { filterClothByCollection, selectedClothingCollection } = useFilterClothByCollection()
    const [filteredCloths, setFilteredCloths] = useState<Cloth[]>([])

    useEffect(() => {
        setFilteredCloths(
            filterClothByCollection(cloths, selectedClothingCollection)
        )
    }, [selectedClothingCollection])

    return (
        <>
            <Head>
                <title>Estoque | Artha</title>
            </Head>

            <main className={styles.contentContainer}>
                <ClothingCollectionHeader />
                <div className={styles.cardContainer}>
                    {selectedClothingCollection ?
                        filteredCloths.map(cloth => (
                            <ClothRow key={cloth.id} cloth={cloth} stocks={stocks} />
                        ))
                        :
                        cloths.map(cloth => (
                            <ClothRow key={cloth.id} cloth={cloth} stocks={stocks} />
                        ))
                    }
                </div>
            </main>
        </>
    );
}