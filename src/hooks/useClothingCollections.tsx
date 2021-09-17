import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

import { ClothingCollectionProviderProps, ClothingCollectionInput, ClothingCollectionContextData } from '../types/clothingCollection'


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