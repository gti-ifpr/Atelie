import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../services/api";

import { Budged, BudgedProviderProps, BudgedInput, BudgedContextData } from '../types/budged';


const BudgedContext = createContext<BudgedContextData>(
    {} as BudgedContextData
);

export function BudgedProvider({ children }: BudgedProviderProps) {
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

    async function removeBudged(budgedId: number) {
        try {
            const updatedBudged = [...budgeds];
            const budgedIndex = updatedBudged.findIndex(budged => budged.id === budgedId);

            if (budgedIndex >= 0) {
                updatedBudged.splice(budgedIndex, 1);
                setBudgeds(updatedBudged);

                await api.delete(`/orcamento/${budgedId}`);
            } else {
                throw Error();
            }
        } catch {
            toast.error('Erro na remoção do orçamento');
        }
    };

    return (
        <BudgedContext.Provider value={{ budgeds, createBudged, removeBudged }}>
            {children}
        </BudgedContext.Provider>
    )
}

export function useBudged() {
    const context = useContext(BudgedContext);

    return context;
}