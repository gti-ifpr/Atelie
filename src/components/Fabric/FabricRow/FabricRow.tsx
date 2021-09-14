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
            <h1>{fabric.nome}</h1>
            <div className={styles.makerContainer}>
                <span>Fabricante: </span>
                <p>{fabric.fabricante}</p>
                <span>Referência: </span>
                <p>{fabric.referenciaDoFabricante}</p>
                <span>Largura: </span>
                <p>{fabric.largura}</p>
            </div>

            <div className={styles.numbersContainer}>
                {fabricStocks.map(stock => {
                    if (fabric.id === stock.id) {
                        return (
                            <div key={stock.id}>
                                <span>Reservados: </span>
                                <p>{stock.reserva}</p>
                                <span>Quantidade: </span>
                                <div className={styles.quantityContainer}>
                                    <p>{stock.quantidade} metros</p>
                                    <MdAddCircle
                                        color="#1a9c6d"
                                        size="2rem"
                                        onClick={() => handleOpenUpdateFabricInStockModal()}
                                    />
                                    <UpdateFabricInStockModal
                                        isOpen={isUpdateFabricInStockOpen}
                                        onRequestClose={handleCloseUpdateFabricInStockModal}
                                        stock={stock}
                                    />
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}