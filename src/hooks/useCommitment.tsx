import { createContext, useEffect, useState, ReactNode, useContext } from 'react'
import { api } from '../services/api';
import { addOneDay } from '../utils/addOneDay';

type Commitment = {
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

type CommitmentInput = {
    compromisso_status: string,
    tipo_compromisso: string,
    cliente_selecionado: number,
    horario_inicio: string,
    horario_termino: string,
    data_agendada: string,
}

type CommitmentProviderProps = {
    children: ReactNode;
}

type CommitmentContextData = {
    compromissos: Commitment[];
    createCommitment: (compromisso: CommitmentInput) => Promise<void>;
}

const CommitmentContext = createContext<CommitmentContextData>(
    {} as CommitmentContextData
);

export function CommitmentProvider({ children }: CommitmentProviderProps) {
    const [compromissos, setCompromissos] = useState<Commitment[]>([])

    useEffect(() => {
        api.get("/schedule").then((response) => setCompromissos(response.data.map((compromisso) => {
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
        })))
    }, []);

    async function createCommitment(commitmentInput: CommitmentInput) {
        const { data } = await api.post("/schedule", commitmentInput);

        setCompromissos([
            data,
            ...compromissos,
        ]);
    }

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