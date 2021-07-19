import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type Cloth = {
    id: number;
    nome: string;
    colecao: number;
    quantidade: number;
    tamanho: number;
};

type FilterClothByCollectionProviderProps = {
    children: ReactNode;
}

type ClothingCollection = {
    id: number;
    nome: string;
}

type FilterClothByCollectionContextData = {
    selectedClothingCollection: ClothingCollection;
    setSelectedClothingCollection: (clothingCollection: ClothingCollection) => void;
    filterClothByCollection: (cloths: Cloth[], selectedClothingCollection: ClothingCollection) => Cloth[];
}

const FilterClothByCollectionContext = createContext<FilterClothByCollectionContextData>(
    {} as FilterClothByCollectionContextData
);

export function FilterClothByCollectionProvider({ children }: FilterClothByCollectionProviderProps) {
    const [selectedClothingCollection, setSelectedClothingCollection] = useState<ClothingCollection>(null);

    function filterClothByCollection(cloths: Cloth[], selectedClothingCollectionInput: ClothingCollection) {
        return cloths.filter((cloth) =>
            cloth.colecao === selectedClothingCollectionInput?.id
        );
    }


    return (
        <FilterClothByCollectionContext.Provider value={{ selectedClothingCollection, setSelectedClothingCollection, filterClothByCollection }}>
            {children}
        </FilterClothByCollectionContext.Provider>
    )
}

export function useFilterClothByCollection() {
    const context = useContext(FilterClothByCollectionContext);

    return context;
}