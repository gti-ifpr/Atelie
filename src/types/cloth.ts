import { ReactNode } from "react"

export type Cloth = {
    id: number;
    nome: string;
    colecao: number;
    quantidade: number;
    tamanho: number;
}

export type Stock = {
    id: number;
    quantidade: number
}

export type ClothProviderProps = {
    children: ReactNode;
}

export type ClothInput = Omit<Cloth, 'id' | 'quantidade'>

export type StockInput = Omit<Stock, 'id'>

export type updateClothInStock = {
    stockId: number;
    amount: number;
}

export type ClothContextData = {
    cloths: Cloth[];
    stocks: Stock[];
    createCloth: (cloth: ClothInput, stock: StockInput) => Promise<void>;
    updateClothInStock: ({ stockId, amount }: updateClothInStock) => void;
}