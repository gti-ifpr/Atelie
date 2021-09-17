import { ReactNode } from "react"

export type Fabric = {
    id: number;
    nome: string;
    fabricante: string;
    referenciaDoFabricante: string;
    largura: number;
}

export type FabricStock = {
    id: number;
    quantidade: number;
    reserva: number;
}

export type FabricProviderProps = {
    children: ReactNode;
}

export type FabricInput = Omit<Fabric, 'id'>

export type FabricStockInput = Omit<FabricStock, 'id'>

export type FabricContextData = {
    fabrics: Fabric[];
    fabricStocks: FabricStock[];
    createFabric: (fabricInput: FabricInput, fabricInStock: FabricStockInput) => Promise<void>;
    updateFabricInStock: ({ stockId, amount }: updateFabricInStock) => void;
    addReserve: ({ stockId, amount }: addReserve) => void;
}

export type updateFabricInStock = {
    stockId: number;
    amount: number;
}

export type addReserve = {
    stockId: number;
    amount: number;
}

