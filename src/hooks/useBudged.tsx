import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

type Budged = {
    id: number;
    cliente: number;
    orcamento: number;
}

type BudgedProviderProps = {
    children: ReactNode;
}

type BudgedInput = Omit<Budged, 'id'>

type BudgedContextData = {
    budgeds: Budged[];
    createBudged: (budgedInput: BudgedInput) => Promise<void>;
}

const BudgedContext = createContext<BudgedContextData>(
    {} as BudgedContextData
);

export function BudgedsProvider({ children }: BudgedProviderProps) {
    const [budgeds, setBudgeds] = useState([]);

    useEffect(() => {
        api.get("/orcamento").then((response) => setBudgeds(response.data));
    }, []);

    async function createBudged(budgedInput: BudgedInput) {
        const { data } = await api.post("/orcamento", budgedInput);

        setBudgeds([
            ...budgeds,
            data,
        ]);
    }

    return (
        <BudgedContext.Provider value={{ budgeds, createBudged }}>
            {children}
        </BudgedContext.Provider>
    )
}

export function useClothingCollections() {
    const context = useContext(BudgedContext);

    return context;
}