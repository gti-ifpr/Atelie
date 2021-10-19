import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../services/api";

import { AviamentoStockInput, AviamentoProviderProps, AviamentoInput, updateAviamentoInStock, addAviamentoReserve, AviamentoContextData } from '../types/aviamento'



const AviamentoContext = createContext<AviamentoContextData>(
    {} as AviamentoContextData
);

export function AviamentoProvider({ children }: AviamentoProviderProps) {
    const [aviamentos, setAviamentos] = useState([]);
    const [aviamentosStock, setAviamentoStocks] = useState([]);

    useEffect(() => {
        api.get("/aviamentos").then((response) => setAviamentos(response.data));
        api.get("/estoque_de_aviamentos").then((response) => setAviamentoStocks(response.data));
    }, []);

    async function createAviamento(fabricInput: AviamentoInput, fabricInStock: AviamentoStockInput) {
        const clothData = await api.post("/aviamentos", fabricInput);
        const stockData = await api.post("/estoque_de_aviamentos", fabricInStock);

        setAviamentos([
            ...aviamentos,
            clothData.data,
        ]);

        setAviamentoStocks([
            ...aviamentosStock,
            stockData.data,
        ])
    }

    async function updateAviamentoInStock({ stockId, amount }: updateAviamentoInStock) {
        try {
            const updatedStock = [...aviamentosStock]

            const stockExists = updatedStock.find(stock => stock.id === stockId);
            if (amount < 0) {
                toast.error("Não é possível possuir menos de 0 em estoque");
                return;
            }

            if (stockExists) {
                stockExists.quantidade = amount
                setAviamentoStocks(updatedStock)

                await api.put(`/estoque_de_aviamentos/${stockId}`, { quantidade: amount, reserva: stockExists.reserva });
            } else {
                throw Error;
            }
        } catch {
            toast.error('Erro na atualização de estoque');
        }
    }

    async function addAviamentoReserve({ stockId, amount }: addAviamentoReserve) {
        try {
            const updatedStock = [...aviamentosStock]

            const stockExists = updatedStock.find(stock => stock.id === stockId);

            if (stockExists.quantidade <= amount) {
                toast('Quantidade reservada maior que a quantidade em estoque', {
                    icon: '⚠️'
                });
            }

            if (stockExists) {
                stockExists.reserva = amount
                setAviamentoStocks(updatedStock)

                await api.put(`/estoque_de_aviamentos/${stockId}`, { quantidade: stockExists.quantidade, reserva: amount });
            } else {
                throw Error;
            }
        } catch {
            toast.error('Erro na inserção da reserva');
        }
    }

    return (
        <AviamentoContext.Provider value={{ createAviamento, aviamentos, aviamentosStock, updateAviamentoInStock, addAviamentoReserve }}>
            {children}
        </AviamentoContext.Provider>
    )
}

export function useAviamento() {
    const context = useContext(AviamentoContext);

    return context;
}