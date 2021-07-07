import { useState } from "react";
import { NewClothingCollectionModal } from "../NewClothingCollectionModal/newClothingCollectionModal";
import { Button } from "../../Button/button";

import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

import styles from './styles.module.scss';
import { useClothingCollections } from "../../../hooks/useClothingCollections";

type ClothingCollection = {
    id: number;
    nome: string;
};

export function ClothingCollectionHeader() {
    const [isNewClothingCollectionModalOpen, setIsNewClothingCollectionModalOpen] = useState(false);

    function handleOpenNewClothingCollectionModal() {
        setIsNewClothingCollectionModalOpen(true);
    }

    function handleCloseNewClothingCollectionModal() {
        setIsNewClothingCollectionModalOpen(false);
    }

    const { clothingCollections } = useClothingCollections()

    const [selectedClothingCollection, setSelectedClothingCollection] = useState(null);

    return (
        <>
            <div className={styles.contentContainer}>
                <Autocomplete
                    value={selectedClothingCollection}
                    onChange={(_, clothingCollection: ClothingCollection) => {
                        setSelectedClothingCollection(clothingCollection);
                    }}
                    id="combo-box-demo"
                    options={clothingCollections as ClothingCollection[]}
                    getOptionLabel={(clothingCollection) => clothingCollection.nome}
                    renderOption={(clothingCollection) => clothingCollection.nome}
                    style={{ width: "30%" }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Coleção"
                            variant="outlined"
                            required
                        />
                    )}
                />


                <Button type="button" onClick={handleOpenNewClothingCollectionModal}>
                    Cadastrar Nova Coleção
                </Button>
            </div>

            <NewClothingCollectionModal
                isOpen={isNewClothingCollectionModalOpen}
                onRequestClose={handleCloseNewClothingCollectionModal}
            />
        </>
    )
}