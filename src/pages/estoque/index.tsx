import { useState } from "react";
import { Button } from "../../components/Button/button";
import { ClothsInStock } from "../../components/ClothsInStock/ClothsInStock";
import { FabricsInStock } from "../../components/FabricsInStock/FabricsInStock";
import { AviamentosInStock } from "../../components/AviamentoInStock/AviamentoInStock";

import styles from './styles.module.scss';

export default function Stock() {
    const [isClothStockActive, setIsClothStockActive] = useState(true);
    const [isFabricStockActive, setIsFabricStockActive] = useState(false);
    const [isAviamentoStockActive, setIsAviamentoStockActive] = useState(false);

    function toggleActiveClothInStock() {
        setIsClothStockActive(true)
        setIsFabricStockActive(false)
        setIsAviamentoStockActive(false)
    }

    function toggleActiveFabricInStock() {
        setIsClothStockActive(false)
        setIsFabricStockActive(true)
        setIsAviamentoStockActive(false)
    }

    function toggleActiveAviamentoInStock() {
        setIsClothStockActive(false)
        setIsFabricStockActive(false)
        setIsAviamentoStockActive(true)
    }

    return (
        <>
            <div className={styles.stockButtonContainer}>
                <Button
                    isActive={isClothStockActive}
                    onClick={() => toggleActiveClothInStock()}>
                    Roupas
                </Button>
                <Button
                    isActive={isFabricStockActive}
                    onClick={() => toggleActiveFabricInStock()}>
                    Tecidos
                </Button>
                <Button
                    isActive={isAviamentoStockActive}
                    onClick={() => toggleActiveAviamentoInStock()}>
                    Aviamentos
                </Button>
            </div>

            {isClothStockActive ?
                <ClothsInStock /> :
                isFabricStockActive ?
                    <FabricsInStock /> :
                    isAviamentoStockActive ?
                        <AviamentosInStock /> :
                        <ClothsInStock />
            }
        </>
    );
}