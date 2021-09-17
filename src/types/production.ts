import { ReactNode } from "react";

export type ProductionFromBd = {
    id: number;
    compromisso_status: string,
    tipo_compromisso: string,
    cliente_selecionado: number,
    horario_inicio: string,
    horario_termino: string,
    data_agendada: string,
};

export type ProductionReturn = {
    id: number;
    horarioInicio: string;
    horarioTermino: string;
    dataAgendadaPtBr: string;
    dataAgendadaString: string;
    dataAgendadaDayOfTheWeek: number;
    dataAgendadaCurrentDate: number;
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