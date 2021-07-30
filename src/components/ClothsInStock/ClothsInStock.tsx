import Head from "next/head";
import { useEffect, FunctionComponent, useState } from "react";
import { ClothingCollectionHeader } from "../../components/ClothingCollection/ClothingCollectionHeader/clothingCollectionHeader";
import { useCloth } from "../../hooks/useCloth";
import { useFilterClothByCollection } from "../../hooks/useFilterClothByCollection";

import { MdAdd, MdRemove } from 'react-icons/md';

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

const StockRow: FunctionComponent<{ cloth: Cloth, stock: Stock }> = ({
    stock
}) => {
    const { updateClothInStock } = useCloth()

    function handleClohIncrement(stock: Stock) {
        updateClothInStock({ stockId: stock.id, amount: stock.quantidade + 1 });
    }

    function handleClothDecrement(stock: Stock) {
        updateClothInStock({ stockId: stock.id, amount: stock.quantidade - 1 });
    }

    return (
        <div className={styles.quantity}>
            <MdRemove
                color="#737380"
                size="1.75rem"
                className={styles.removeAndAddButtons}
                onClick={() => handleClothDecrement(stock)}
            />
            <p>{stock.quantidade}</p>
            <MdAdd
                color="#737380"
                size="1.75rem"
                className={styles.removeAndAddButtons}
                onClick={() => handleClohIncrement(stock)}
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
                            return <StockRow key={stock.id} cloth={cloth} stock={stock} />
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

export default function ClothInStock() {
    const { cloths, stocks } = useCloth()
    const { filterClothByCollection, selectedClothingCollection } = useFilterClothByCollection()
    const [filteredCloths, setFilteredCloths] = useState<Cloth[]>([]);


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