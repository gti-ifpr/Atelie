import { ReactNode } from "react"

export type Budged = {
    id: number;
    cliente: number;
    orcamento: number;
}

export type BudgedProviderProps = {
    children: ReactNode;
}

export type BudgedInput = Omit<Budged, 'id'>

export type BudgedContextData = {
    budgeds: Budged[];
    createBudged: (budgedInput: BudgedInput) => Promise<void>;
    removeBudged: (budgedId: number) => void;
}