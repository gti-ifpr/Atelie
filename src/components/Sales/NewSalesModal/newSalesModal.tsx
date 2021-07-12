import Modal from "react-modal";
import { FiX } from "react-icons/fi";
import { useState, FormEvent, useEffect } from "react";

import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

import styles from "./styles.module.scss";
import React from "react";

import { useClothingCollections } from "../../../hooks/useClothingCollections";
import { useFilterClothByCollection } from "../../../hooks/useFilterClothByCollection";
import { useCloth } from "../../../hooks/useCloth";

type ClothingCollection = {
    id: number;
    nome: string;
};

type Cloth = {
    id: number;
    nome: string;
    colecao: number
}

type NewScheduleModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
};


export function NewSalesModal({
    isOpen,
    onRequestClose,
}: NewScheduleModalProps) {

    const [nome, setNome] = useState("");
    const [filteredCloths, setFilteredCloths] = useState<Cloth[]>([])
    const [selectedCloth, setSelectedCloth] = useState<Cloth>()

    const { selectedClothingCollection, setSelectedClothingCollection, filterClothByCollection } = useFilterClothByCollection()
    const { clothingCollections } = useClothingCollections()
    const { cloths } = useCloth()

    async function handleCreateNewSchedule(event: FormEvent) {
        event.preventDefault();

        onRequestClose();
    }

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
                        getOptionLabel={(cloth) => cloth.nome}
                        renderOption={(cloth) => cloth.nome}
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



                    <span>Nome da Coleção:</span>

                    <input
                        required
                        placeholder="Nome"
                        value={nome}
                        onChange={(event) => setNome(event.target.value)}
                    />
                    <button type="submit">Cadastrar Coleção</button>

                </form>
            </div>
        </Modal>
    );
}
