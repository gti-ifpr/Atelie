import Modal from "react-modal";
import { FiX } from "react-icons/fi";
import { useState, FormEvent, useEffect } from "react";

import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

import styles from "./styles.module.scss";
import React from "react";

import { useClothingCollections } from "../../../hooks/useClothingCollections";
import { useFilterClothByCollection } from "../../../hooks/useFilterClothByCollection";
import { useSale } from "../../../hooks/useSale";
import { useCloth } from "../../../hooks/useCloth";

type ClothingCollection = {
    id: number;
    nome: string;
};

type Cloth = {
    id: number;
    nome: string;
    colecao: number;
    quantidade: number;
    tamanho: number;
};

type NewScheduleModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
};


export function NewSalesModal({
    isOpen,
    onRequestClose,
}: NewScheduleModalProps) {

    const [filteredCloths, setFilteredCloths] = useState<Cloth[]>([]);
    const [selectedCloth, setSelectedCloth] = useState<Cloth>(null);

    const { selectedClothingCollection, setSelectedClothingCollection, filterClothByCollection } = useFilterClothByCollection();
    const { clothingCollections } = useClothingCollections();
    const { cloths } = useCloth();
    const { createSale } = useSale();

    async function handleCreateNewSchedule(event: FormEvent) {
        event.preventDefault();

        await createSale({
            colecao: selectedClothingCollection.id,
            roupa: selectedCloth.id
        });

        onRequestClose();
    }


    useEffect(() => {
        setSelectedClothingCollection(null)
    }, []);

    useEffect(() => {
        setFilteredCloths(
            filterClothByCollection(cloths, selectedClothingCollection)
        )
    }, [selectedClothingCollection])

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            ariaHideApp={false}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <FiX
                color="#737380"
                size="2rem"
                className="react-modal-close"
                onClick={() => onRequestClose()}
            />
            <div className={styles.modal}>
                <h1>Cadastrar Nova Venda</h1>

                <form autoComplete="off" onSubmit={handleCreateNewSchedule}>
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
                    <button type="submit">Cadastrar Venda</button>
                </form>
            </div>
        </Modal>
    );
}
