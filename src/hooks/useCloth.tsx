import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

type Cloth = {
    id: number;
    nome: string;
    colecao: number;
    quantidade: number;
    tamanho: number;
}

type ClothProviderProps = {
    children: ReactNode;
}

type ClothInput = Omit<Cloth, 'id'>

type ClothContextData = {
    cloths: Cloth[];
    createCloth: (cloth: ClothInput) => Promise<void>;
}

const ClothContext = createContext<ClothContextData>(
    {} as ClothContextData
);

export function ClothProvider({ children }: ClothProviderProps) {
    const [cloths, setCloths] = useState([]);

    useEffect(() => {
        api.get("/roupas").then((response) => setCloths(response.data));
    }, []);

    async function createCloth(clothing: ClothInput) {
        const { data } = await api.post("/roupas", clothing);

        setCloths([
            ...cloths,
            data,
        ]);
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