import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

type Cloth = {
    id: number;
    nome: string;
    colecao: number;
    tamanho: number;
}

type Stock = {
    quantidade: number
}

type ClothProviderProps = {
    children: ReactNode;
}

type ClothInput = Omit<Cloth, 'id'>

type ClothContextData = {
    cloths: Cloth[];
    createCloth: (cloth: ClothInput, stock: Stock) => Promise<void>;
}

const ClothContext = createContext<ClothContextData>(
    {} as ClothContextData
);

export function ClothProvider({ children }: ClothProviderProps) {
    const [cloths, setCloths] = useState([]);
    const [stock, setStock] = useState([]);

    useEffect(() => {
        api.get("/roupas").then((response) => setCloths(response.data));
    }, []);

    async function createCloth(clothing: ClothInput, clothInStock: Stock) {
        const clothData = await api.post("/roupas", clothing);
        const stockData = await api.post("/stock", clothInStock);
        setCloths([
            ...cloths,
            clothData.data,
        ]);

        setStock([
            ...stock,
            stockData.data,
        ])
    }

    return (
        <ClothContext.Provider value={{ cloths, createCloth }}>
            {children}
        </ClothContext.Provider>
    )
}

export function useCloth() {
    const context = useContext(ClothContext);

    return context;
}