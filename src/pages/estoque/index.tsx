import { useState } from "react";
import { Button } from "../../components/Button/button";
import { ClothsInStock } from "../../components/ClothsInStock/ClothsInStock";
import { FabricsInStock } from "../../components/FabricsInStock/FabricsInStock";

export default function Stock() {
    const [isClothStockActive, setIsClothStockActive] = useState(true);

    return (
        <>
            <Button isActive={isClothStockActive} onClick={() => setIsClothStockActive(true)}>Tecidos</Button>
            <Button isActive={!isClothStockActive} onClick={() => setIsClothStockActive(false)}>Roupas</Button>


            {isClothStockActive ?
                <ClothsInStock />
                :
                <FabricsInStock />
            }
        </>
    );
}