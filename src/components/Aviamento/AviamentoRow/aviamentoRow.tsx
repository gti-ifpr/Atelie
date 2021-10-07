import { FunctionComponent, useState } from "react";
import { MdAddCircle } from 'react-icons/md'
import { UpdateAviamentoInStockModal } from "../UpdateAviamentoInStockModal/updateAviamentoInStockModal";

import styles from './styles.module.scss';

export const AviamentoRow: FunctionComponent<{ aviamento, aviamentoStock }> = ({
    aviamento,
    aviamentoStock
}) => {
    const [isUpdateAviamentoInStockOpen, setIsUpdateAviamentoInStockOpen] = useState(false);

    function handleOpenUpdateAviamentoInStockModal() {
        setIsUpdateAviamentoInStockOpen(true);
    };

    function handleCloseUpdateAviamentoInStockModal() {
        setIsUpdateAviamentoInStockOpen(false);
    };

    return (
        <div key={aviamento.id} className={styles.card}>
            <h1>{aviamento.nome}</h1>
            <div className={styles.makerContainer}>
                <span>Fornecedor: </span>
                <p>{aviamento.fornecedor}</p>
                <span>Referência: </span>
                <p>{aviamento.referencia}</p>
            </div>

            <div className={styles.numbersContainer}>
                {aviamentoStock.map(stock => {
                    if (aviamento.id === stock.id) {
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
                                        onClick={() => handleOpenUpdateAviamentoInStockModal()}
                                    />
                                    <UpdateAviamentoInStockModal
                                        isOpen={isUpdateAviamentoInStockOpen}
                                        onRequestClose={handleCloseUpdateAviamentoInStockModal}
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