import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

import { Sale, SaleProviderProps, SaleInput, SaleContextData } from '../types/sale'


const SaleContext = createContext<SaleContextData>(
    {} as SaleContextData
);

export function SaleProvider({ children }: SaleProviderProps) {
    const [sales, setSales] = useState([]);

    useEffect(() => {
        api.get("/vendas").then((response) => setSales(response.data));
    }, []);

    async function createSale(sale: SaleInput) {
        const { data } = await api.post("/vendas", sale);

        setSales([
            ...sales,
            data,
        ]);
    }

    return (
        <SaleContext.Provider value={{ sales, createSale }}>
            {children}
        </SaleContext.Provider>
    )
}

export function useSale() {
    const context = useContext(SaleContext);

    return context;
}