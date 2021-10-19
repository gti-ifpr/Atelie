import { ReactNode } from "react"

export type Aviamento = {
    id: number;
    nome: string;
    fornecedor: string;
    referencia: string;
}

export type AviamentoStock = {
    id: number;
    quantidade: number;
    reserva: number;
}

export type AviamentoProviderProps = {
    children: ReactNode;
}

export type AviamentoInput = Omit<Aviamento, 'id'>

export type AviamentoStockInput = Omit<AviamentoStock, 'id'>

export type AviamentoContextData = {
    aviamentos: Aviamento[];
    aviamentosStock: AviamentoStock[];
    createAviamento: (fabricInput: AviamentoInput, fabricInStock: AviamentoStockInput) => Promise<void>;
    updateAviamentoInStock: ({ stockId, amount }: updateAviamentoInStock) => void;
    addAviamentoReserve: ({ stockId, amount }: addAviamentoReserve) => void;
}

export type updateAviamentoInStock = {
    stockId: number;
    amount: number;
}

export type addAviamentoReserve = {
    stockId: number;
    amount: number;
}

