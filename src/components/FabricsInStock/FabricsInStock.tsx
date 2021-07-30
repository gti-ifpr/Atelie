import { useFabric } from "../../hooks/useFabric";
import { FabricHeader } from "../Fabric/FabricHeader/FabricHeader";

import styles from "./styles.module.scss"

export function FabricsInStock() {
    const { fabrics, fabricStocks } = useFabric()
    return (
        <main className={styles.contentContainer}>
            <FabricHeader />

            <div className={styles.cardContainer}></div>
            {fabrics.map(fabric => (
                <div key={fabric.id} className={styles.card}>
                    <p>{fabric.nome}</p>
                    <p>{fabric.fabricante}</p>
                    <p>{fabric.referenciaDoFabricante}</p>
                    <p>{fabric.largura}</p>
                    <p>
                        {fabricStocks.map(stock => {
                            if (fabric.id === stock.id) {
                                return stock.quantidade
                            }
                        })} metros
                    </p>
                </div>
            ))}
        </ main>
    );
}