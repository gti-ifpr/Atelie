import Modal from 'react-modal'
import styles from './styles.module.scss';

type NewClientModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewClientModal({ isOpen, onRequestClose }: NewClientModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <div className={styles.modal}>
                <h1>Cadastrar Novo Cliente</h1>
                <form>
                    <div className={styles.name}>
                        <input placeholder="Nome" />
                        <input placeholder="Sobrenome" />
                    </div>
                    <div className={styles.contats}>
                        <input type="email" placeholder="E-mail" />
                        <input type="text" placeholder="Telefone" />
                    </div>
                    <input placeholder="Endereço" />
                    <div className={styles.address}>
                        <input placeholder="Cidade" />
                        <input placeholder="CEP" />
                    </div>
                    <button type="submit">
                        Cadastrar Cliente
                    </button>
                </form>
            </div>
        </Modal>
    )
}