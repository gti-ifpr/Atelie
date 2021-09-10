import { useState } from "react";
import { Button } from "../../components/Button/button";
import { ClothsInStock } from "../../components/ClothsInStock/ClothsInStock";
import { FabricsInStock } from "../../components/FabricsInStock/FabricsInStock";

import styles from './styles.module.scss';

export default function Stock() {
    const [isClothStockActive, setIsClothStockActive] = useState(true);

    return (
        <>
            <div className={styles.stockButtonContainer}>
                <Button isActive={isClothStockActive} onClick={() => setIsClothStockActive(true)}>Roupas</Button>
                <Button isActive={!isClothStockActive} onClick={() => setIsClothStockActive(false)}>Tecidos</Button>
            </div>

            {isClothStockActive ?
                <ClothsInStock />
                :
                <FabricsInStock />
            }
        </>
    );
}