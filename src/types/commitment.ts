import { ReactNode } from "react";

export type CommitmentFromBd = {
    id: number;
    compromisso_status: string,
    tipo_compromisso: string,
    cliente_selecionado: number,
    horario_inicio: string,
    horario_termino: string,
    data_agendada: string,
};

export type CommitmentReturn = {
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

export type CommitmentInput = Omit<CommitmentFromBd, 'id'>

export type CommitmentProviderProps = {
    children: ReactNode;
}

export type CommitmentContextData = {
    compromissos: CommitmentReturn[];
    createCommitment: (compromisso: CommitmentInput) => Promise<void>;
}
