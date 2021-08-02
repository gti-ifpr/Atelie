import Modal from "react-modal";
import { FiX } from "react-icons/fi";

import styles from './styles.module.scss';
import { useState } from "react";

type NewScheduleModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
};

export function UpdateFabricInStockModal({
    isOpen,
    onRequestClose,
}: NewScheduleModalProps) {
    const [amount, setAmount] = useState<number>();

    function handleUpdateFabricStock() {

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

                <form autoComplete="off" onSubmit={handleUpdateFabricStock}>
                    <div className={styles.contentContainer}>
                        <span>Quandidade à adicionar:</span>
                        <input
                            required
                            placeholder="0 metros"
                            value={amount}
                            onChange={(event) => setAmount(Number(event.target.value))}
                        />
                        <button type="submit">Cadastrar Tecido</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}