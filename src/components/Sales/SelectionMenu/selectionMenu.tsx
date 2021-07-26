import { useClothingCollections } from "../../../hooks/useClothingCollections";
import { useFilterClothByCollection } from "../../../hooks/useFilterClothByCollection";
import { useCloth } from "../../../hooks/useCloth";
import { useCart } from "../../../hooks/useCart";

import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import { useEffect, useState } from "react";

import styles from "./styles.module.scss";

type ClothingCollection = {
    id: number;
    nome: string;
};

type Cloth = {
    id: number;
    nome: string;
    colecao: number;
    tamanho: number;
};



export function SelectionMenu() {
    const [filteredCloths, setFilteredCloths] = useState<Cloth[]>([]);
    const [selectedCloth, setSelectedCloth] = useState<Cloth>({ id: 0, nome: '', colecao: 0, tamanho: 0 });

    const { selectedClothingCollection, setSelectedClothingCollection, filterClothByCollection } = useFilterClothByCollection();
    const { clothingCollections } = useClothingCollections();
    const { addCloth } = useCart();
    const { cloths } = useCloth();

    useEffect(() => {
        setSelectedClothingCollection(null)
    }, []);

    useEffect(() => {
        setFilteredCloths(
            filterClothByCollection(cloths, selectedClothingCollection)
        )
    }, [selectedClothingCollection])

    function handleAddClothInCart(clothId: number) {
        setSelectedCloth({ id: 0, nome: '', colecao: 0, tamanho: 0 })
        addCloth(clothId);
    }

    return (
        <div className={styles.contentContainer}>
            <div className={styles.autocompleteContainer}>
                <Autocomplete
                    value={selectedClothingCollection}
                    onChange={(_, clothingCollection: ClothingCollection) => {
                        setSelectedClothingCollection(clothingCollection);
                    }}
                    id="combo-box-demo"
                    options={clothingCollections as ClothingCollection[]}
                    getOptionLabel={(clothingCollection) => clothingCollection.nome}
                    renderOption={(clothingCollection) => clothingCollection.nome}
                    style={{ width: "100%" }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Coleção"
                            variant="outlined"
                            required
                        />
                    )}
                />
            </div>
            <div className={styles.autocompleteContainer}>
                <Autocomplete
                    value={selectedCloth}
                    onChange={(_, cloth: Cloth) => {
                        setSelectedCloth(cloth);
                    }}
                    id="combo-box-demo"
                    options={filteredCloths as Cloth[]}
                    getOptionLabel={(cloth) => `${cloth.nome} ${cloth.tamanho}`}
                    renderOption={(cloth) => `${cloth.nome} ${cloth.tamanho}`}
                    style={{ width: "100%" }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Roupa"
                            variant="outlined"
                            required
                        />
                    )}
                />
            </div>
            <button
                type="button"
                className={styles.submitButton}
                onClick={() => handleAddClothInCart(selectedCloth.id)}
            >Cadastrar Venda na Tabela</button>
        </ div>
    )
}
