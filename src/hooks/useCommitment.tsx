import { createContext, useEffect, useState, ReactNode, useContext } from 'react'
import { api } from '../services/api';
import { addOneDay } from '../utils/addOneDay';

import { CommitmentFromBd, CommitmentReturn } from '../types'


type CommitmentInput = Omit<CommitmentFromBd, 'id'>

type CommitmentProviderProps = {
    children: ReactNode;
}

type CommitmentContextData = {
    compromissos: CommitmentReturn[];
    createCommitment: (compromisso: CommitmentInput) => Promise<void>;
}

const CommitmentContext = createContext<CommitmentContextData>(
    {} as CommitmentContextData
);

export function CommitmentProvider({ children }: CommitmentProviderProps) {
    const [compromissosFromBD, setCompromissos] = useState<CommitmentFromBd[]>([])

    useEffect(() => {
        api.get("/schedule").then((response) => setCompromissos(response.data))
    }, []);

    async function createCommitment(commitmentInput: CommitmentInput) {
        const { data } = await api.post("/schedule", commitmentInput);

        setCompromissos([
            data,
            ...compromissosFromBD,
        ]);
    }

    const compromissos: CommitmentReturn[] = compromissosFromBD.map((compromisso) => {
        return {
            id: compromisso.id,
            horarioInicio: compromisso.horario_inicio,
            horarioTermino: compromisso.horario_termino,
            dataAgendadaString: compromisso.data_agendada,
            dataAgendadaPtBr: new Date(addOneDay(compromisso.data_agendada)).toLocaleDateString('pt-BR'),
            dataAgendadaDayOfTheWeek: new Date(addOneDay(compromisso.data_agendada)).getDay(),
            dataAgendadaCurrentDate: new Date(addOneDay(compromisso.data_agendada)).getTime(),
            selectedClient: compromisso.cliente_selecionado,
            tipo: compromisso.tipo_compromisso,
            status: compromisso.compromisso_status,
        };
    });

    return (
        <CommitmentContext.Provider value={{ compromissos, createCommitment }}>
            {children}
        </CommitmentContext.Provider>
    )
}

export function useCommitment() {
    const context = useContext(CommitmentContext);

    return context;
}