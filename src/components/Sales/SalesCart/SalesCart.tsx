import { useCart } from "../../../hooks/useCart";

import styles from './styles.module.scss'
import { MdAdd, MdRemove, MdDelete } from 'react-icons/md';

type Cloth = {
    id: number;
    nome: string;
    colecao: number;
    quantidade: number;
    tamanho: number;
}

export function SalesCart() {
    const { cart, removeCloth, updateClothAmount } = useCart();

    function handleClothDecrement(cloth: Cloth) {
        updateClothAmount({ clothId: cloth.id, amount: cloth.quantidade - 1 });
    }

    function handleClothIncrement(cloth: Cloth) {
        updateClothAmount({ clothId: cloth.id, amount: cloth.quantidade + 1 });
    }


    return (
        <div className={styles.contentContainer}>
            <h3>Roupas no carrinho:</h3>
            {cart.map(cloth => (
                <div key={cloth.id} className={styles.saleClothContainer}>
                    <div className={styles.titleContainer}>
                        <h2>{`${cloth.nome} (${cloth.colecao})`}</h2>
                        <MdDelete
                            color="#737380"
                            size="1.75rem"
                            className={styles.removeAndAddButtons}
                            onClick={() => removeCloth(cloth.id)}
                        />
                    </div>

                    <span>Quantidade:</span>

                    <div className={styles.quantity}>
                        <MdRemove
                            color="#737380"
                            size="1.75rem"
                            className={styles.removeAndAddButtons}
                            onClick={() => handleClothDecrement(cloth)}
                        />
                        <p>{cloth.quantidade}</p>
                        <MdAdd
                            color="#737380"
                            size="1.75rem"
                            className={styles.removeAndAddButtons}
                            onClick={() => handleClothIncrement(cloth)}
                        />
                    </div>
                    <span>Tamanho: </span>
                    <p>{cloth.tamanho}</p>
                </div>
            ))}
        </div>
    )
}