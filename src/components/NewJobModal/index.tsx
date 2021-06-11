import Modal from 'react-modal'
import styles from './styles.module.scss'

type NewJobModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewJobModal({ isOpen, onRequestClose }: NewJobModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <main className={styles.modal}>
                <h1>Cadastrar Nova Prova</h1>

                <form>
                    <input placeholder="Cliente" />

                    <span>Prova: </span>
                    <select name="prova" id="prova">
                        <option value="molde">Molde</option>
                        <option value="corte">Corte</option>
                        <option value="montagem">Montagem</option>
                        <option value="prova 1">Prova 1</option>
                        <option value="prova 2">Prova 2</option>
                        <option value="prova 3">Prova 3</option>
                    </select>
                    <span>Tecido: </span>
                    <select name="tecido" id="tecido">
                        <option value="tecido 1">Tecido 1</option>
                        <option value="tecido 2">Tecido 2</option>
                    </select>

                    <div className={styles.dates}>
                        <div>
                            <span>Data de Início: </span>
                            <input type="date" />
                        </div>
                        <div>
                            <span>Data de Entrega: </span>
                            <input type="date" />
                        </div>
                    </div>

                    <button type="submit">
                        Cadastrar Cliente
                    </button>

                </form>
            </main>
        </Modal>
    )
}