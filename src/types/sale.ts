import { ReactNode } from 'react'
import { Cloth } from './cloth'

export type Sale = {
    id: number;
    produtos: Cloth[];
    cliente: number;
}

export type SaleProviderProps = {
    children: ReactNode;
}

export type SaleInput = Omit<Sale, 'id'>

export type SaleContextData = {
    sales: Sale[];
    createSale: (sale: SaleInput) => Promise<void>;
}