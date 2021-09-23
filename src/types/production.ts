import { ReactNode } from "react";

export type ProductionFromBd = {
    id: number;
    compromissoStatus: string,
    tipoCompromisso: string,
    clienteSelecionado: number,
    fichaTecnicaSelecionada: number,
    horarioInicio: string,
    horarioTermino: string,
    dataInicio: string,
    dataTermino: string,
};

export type ProductionReturn = {
    id: number;
    horarioInicio: string;
    horarioTermino: string;
    dataInicioPtBr: string;
    dataTerminoPtBr: string;
    dataInicioString: string;
    dataInicioDayOfTheWeek: number;
    dataTerminoDayOfTheWeek: number;
    dataInicioCurrentDate: number;
    dataTerminoCurrentDate: number;
    selectedClient: number;
    tipo: string;
    status: string;
};

export type ProductionInput = Omit<ProductionFromBd, 'id'>

export type ProductionProviderProps = {
    children: ReactNode;
}

export type ProductionContextData = {
    producoes: ProductionReturn[];
    createProduction: (compromisso: ProductionInput) => Promise<void>;
}