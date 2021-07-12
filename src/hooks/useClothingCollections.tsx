import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

type ClothingCollection = {
    id: number;
    nome: string;
}

type ClothingCollectionProviderProps = {
    children: ReactNode;
}

type ClothingCollectionInput = Omit<ClothingCollection, 'id'>

type ClothingCollectionContextData = {
    clothingCollections: ClothingCollection[];
    createClothingCollection: (clothCollection: ClothingCollectionInput) => Promise<void>;
}

const ClothingCollectionContext = createContext<ClothingCollectionContextData>(
    {} as ClothingCollectionContextData
);

export function ClothingCollectionsProvider({ children }: ClothingCollectionProviderProps) {
    const [clothingCollections, setClothingCollections] = useState([]);

    useEffect(() => {
        api.get("/colecao").then((response) => setClothingCollections(response.data));
    }, []);

    async function createClothingCollection(clothingCollection: ClothingCollectionInput) {
        const { data } = await api.post("/colecao", clothingCollection);

        setClothingCollections([
            ...clothingCollections,
            data,
        ]);
    }

    return (
        <ClothingCollectionContext.Provider value={{ clothingCollections, createClothingCollection }}>
            {children}
        </ClothingCollectionContext.Provider>
    )
}

export function useClothingCollections() {
    const context = useContext(ClothingCollectionContext);

    return context;
}