import { FunctionComponent, useState } from "react";
import { MdAddCircle } from 'react-icons/md'
import { UpdateFabricInStockModal } from "../UpdateFabricInStockModal/UpdateFabricInStockModal";

import styles from './styles.module.scss';

export const FabricRow: FunctionComponent<{ fabric, fabricStocks }> = ({
    fabric,
    fabricStocks
}) => {
    const [isUpdateFabricInStockOpen, setIsUpdateFabricInStockOpen] = useState(false);

    function handleOpenUpdateFabricInStockModal() {
        setIsUpdateFabricInStockOpen(true);
    };

    function handleCloseUpdateFabricInStockModal() {
        setIsUpdateFabricInStockOpen(false);
    };

    return (
        <div key={fabric.id} className={styles.card}>
            <p>{fabric.nome}</p>
            <p>{fabric.fabricante}</p>
            <p>{fabric.referenciaDoFabricante}</p>
            <p>{fabric.largura}</p>
            <p>
                {fabricStocks.map(stock => {
                    if (fabric.id === stock.id) {
                        return (
                            <div key={stock.id}>
                                <p>{stock.quantidade} metros</p>
                                <MdAddCircle
                                    color="#737380"
                                    size="1.75rem"
                                    onClick={() => handleOpenUpdateFabricInStockModal()}
                                />
                            </div>
                        )
                    }
                })}
            </p>

            <UpdateFabricInStockModal
                isOpen={isUpdateFabricInStockOpen}
                onRequestClose={handleCloseUpdateFabricInStockModal}
            />
        </div>
    )
}