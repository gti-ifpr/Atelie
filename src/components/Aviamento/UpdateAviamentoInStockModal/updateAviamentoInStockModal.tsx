import Modal from "react-modal";
import { FiX } from "react-icons/fi";

import styles from './styles.module.scss';
import { useState, FormEvent } from "react";
import { useAviamento } from "../../../hooks/useAviamento";

type AviamentoStock = {
    id: number;
    quantidade: number
}

type NewScheduleModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
    stock: AviamentoStock
};

export function UpdateAviamentoInStockModal({
    isOpen,
    onRequestClose,
    stock
}: NewScheduleModalProps) {
    const [fabricAmount, setAmount] = useState(0);
    const { updateAviamentoInStock } = useAviamento();

    async function handleUpdateAviamentoStock(event: FormEvent) {
        event.preventDefault();

        await updateAviamentoInStock({ stockId: stock.id, amount: stock.quantidade + fabricAmount })

        onRequestClose();

        setAmount(0);
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            ariaHideApp={false}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <FiX
                color="#737380"
                size="2rem"
                className="react-modal-close"
                onClick={() => onRequestClose()}
            />
            <div className={styles.modal}>
                <h1>Digite a Quantidade que Deseja Atualizar no Estoque</h1>

                <form autoComplete="off" onSubmit={handleUpdateAviamentoStock}>
                    <div className={styles.contentContainer}>
                        <span>Quandidade à adicionar:</span>
                        <input
                            required
                            placeholder="0 metros"
                            value={fabricAmount}
                            onChange={(event) => setAmount(Number(event.target.value))}
                        />
                        <button type="submit">Atualizar Quantidade</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}