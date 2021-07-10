import Modal from "react-modal";
import { FiX } from "react-icons/fi";
import { useState, FormEvent } from "react";

import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

import styles from "./styles.module.scss";
import React from "react";

import { useClothingCollections } from "../../../hooks/useClothingCollections";
import { useCloth } from "../../../hooks/useCloth";

type NewScheduleModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
};

type ClothingCollection = {
    id: number;
    nome: string;
};


export function NewClothModal({
    isOpen,
    onRequestClose,
}: NewScheduleModalProps) {

    const [nome, setNome] = useState("");
    const [selectedClothingCollection, setSelectedClothingCollection] = useState<ClothingCollection>(null);

    const { clothingCollections } = useClothingCollections()

    const { createCloth } = useCloth()

    async function handleCreateNewSchedule(event: FormEvent) {
        event.preventDefault();

        await createCloth({
            nome: nome,
            colecao: selectedClothingCollection.id
        })

        onRequestClose();

        setNome('');
    }

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
                <h1>Cadastrar Nova Coleção</h1>

                <form autoComplete="off" onSubmit={handleCreateNewSchedule}>
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
                        <span>Nome da Roupa:</span>
                        <input
                            required
                            placeholder="Nome"
                            value={nome}
                            onChange={(event) => setNome(event.target.value)}
                        />
                        <button type="submit">Cadastrar Roupa</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
