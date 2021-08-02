import { useFabric } from "../../hooks/useFabric";
import { FabricHeader } from "../Fabric/FabricHeader/FabricHeader";
import { FabricRow } from '../Fabric/FabricRow/FabricRow';

import styles from "./styles.module.scss"

export function FabricsInStock() {
    const { fabrics, fabricStocks } = useFabric()
    return (
        <main className={styles.contentContainer}>
            <FabricHeader />

            <div className={styles.cardContainer}></div>
            {fabrics.map(fabric => (
                <FabricRow fabric={fabric} fabricStocks={fabricStocks} />
            ))}
        </ main>
    );
}