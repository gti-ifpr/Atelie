import { useCart } from "../../../hooks/useCart";

import styles from './styles.module.scss'
import { MdAdd, MdRemove } from 'react-icons/md';

export function SalesCart() {
    const { cart } = useCart();

    return (
        <div className={styles.contentContainer}>
            {cart.map(cloth => (
                <tr key={cloth.id}>
                    <h2>{`${cloth.nome} (${cloth.colecao})`}</h2>
                    <span>Quantidade:</span>

                    <div className={styles.quantity}>
                        <MdRemove
                            color="#737380"
                            size="1.75rem"
                            className={styles.removeAndAddButtons}
                            onClick={() => console.log('oi')}
                        />
                        <p>{cloth.quantidade}</p>
                        <MdAdd
                            color="#737380"
                            size="1.75rem"
                            className={styles.removeAndAddButtons}
                            onClick={() => console.log('oi')}
                        />
                    </div>
                    <span>Tamanho: </span>
                    <p>{cloth.tamanho}</p>
                </tr>
            ))}
        </div>
    )
}