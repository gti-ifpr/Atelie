import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../services/api";

type Fabric = {
    id: number;
    nome: string;
    fabricante: string;
    referenciaDoFabricante: string;
    largura: number;
}

type FabricStock = {
    id: number;
    quantidade: number
}

type ClothProviderProps = {
    children: ReactNode;
}

type FabricInput = Omit<Fabric, 'id'>

type FabricStockInput = Omit<FabricStock, 'id'>

type updateClothInStock = {
    stockId: number;
    amount: number;
}

type FabricContextData = {
    createFabric: (fabricInput: FabricInput, fabricInStock: FabricStockInput) => Promise<void>;
}

const FabricContext = createContext<FabricContextData>(
    {} as FabricContextData
);

export function FabricProvider({ children }: ClothProviderProps) {
    const [fabric, setFabric] = useState([]);
    const [fabricStocks, setFabricStocks] = useState([]);

    useEffect(() => {
        api.get("/tecidos").then((response) => setFabric(response.data));
        api.get("/estoque_de_tecidos").then((response) => setFabricStocks(response.data));
    }, []);

    async function createFabric(fabricInput: FabricInput, fabricInStock: FabricStockInput) {
        const clothData = await api.post("/tecidos", fabricInput);
        const stockData = await api.post("/estoque_de_tecidos", fabricInStock);

        setFabric([
            ...fabric,
            clothData.data,
        ]);

        setFabricStocks([
            ...fabricStocks,
            stockData.data,
        ])
    }

    /* async function updateFabricInStock({ stockId, amount }: updateClothInStock) {
        try {
            const updatedStock = [...stocks]

            const stockExists = updatedStock.find(stock => stock.id === stockId);
            if (amount < 0) {
                toast.error("Não é possível possuir menos de 0 em estoque");
                return;
            }

            if (stockExists) {
                stockExists.quantidade = amount
                setStocks(updatedStock)

                await api.put(`/stock/${stockId}`, { quantidade: amount });
            } else {
                throw Error;
            }
        } catch {
            toast.error('Erro na atualização de estoque');
        }
    } */

    return (
        <FabricContext.Provider value={{ createFabric }}>
            {children}
        </FabricContext.Provider>
    )
}

export function useFabric() {
    const context = useContext(FabricContext);

    return context;
}