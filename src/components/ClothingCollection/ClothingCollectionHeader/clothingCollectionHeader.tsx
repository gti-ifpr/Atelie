import { useState } from "react";
import { NewClothingCollectionModal } from "../NewClothingCollectionModal/newClothingCollectionModal";
import { NewClothModal } from "../NewClothModal/newClothModal";
import { Button } from "../../Button/button";

import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

import styles from './styles.module.scss';
import { useClothingCollections } from "../../../hooks/useClothingCollections";
import { useFilterClothByCollection } from "../../../hooks/useFilterClothByCollection";

type ClothingCollection = {
    id: number;
    nome: string;
};

export function ClothingCollectionHeader() {
    const [isNewClothingCollectionModalOpen, setIsNewClothingCollectionModalOpen] = useState(false);
    const [isNewClothModalOpen, setIsNewClothModalOpen] = useState(false);

    function handleOpenNewClothingCollectionModal() {
        setIsNewClothingCollectionModalOpen(true);
    }

    function handleCloseNewClothingCollectionModal() {
        setIsNewClothingCollectionModalOpen(false);
    }

    function handleOpenNewClothModal() {
        setIsNewClothModalOpen(true);
    }

    function handleCloseNewClothModal() {
        setIsNewClothModalOpen(false);
    }

    const { clothingCollections } = useClothingCollections()
    const { selectedClothingCollection, setSelectedClothingCollection } = useFilterClothByCollection()


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

                <div>
                    <Button type="button" onClick={handleOpenNewClothingCollectionModal}>
                        Cadastrar Nova Coleção
                    </Button>

                    <Button type="button" onClick={handleOpenNewClothModal}>
                        Cadastrar Nova Roupa
                    </Button>
                </div>
            </div>

            <NewClothingCollectionModal
                isOpen={isNewClothingCollectionModalOpen}
                onRequestClose={handleCloseNewClothingCollectionModal}
            />
            <NewClothModal
                isOpen={isNewClothModalOpen}
                onRequestClose={handleCloseNewClothModal}
            />
        </>
    )
}