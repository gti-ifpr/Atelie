import { ReactNode } from "react"

export type ClothingCollection = {
    id: number;
    nome: string;
}

export type ClothingCollectionProviderProps = {
    children: ReactNode;
}

export type ClothingCollectionInput = Omit<ClothingCollection, 'id'>

export type ClothingCollectionContextData = {
    clothingCollections: ClothingCollection[];
    createClothingCollection: (clothCollection: ClothingCollectionInput) => Promise<void>;
}