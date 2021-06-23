import { GetServerSideProps } from "next";
import Head from "next/head";
import { FunctionComponent, useEffect, useState } from "react";
import { ScheduleHeader } from "../../components/Schedule/ScheduleHeader";
import { api } from "../../services/api";
import { getCurrentDateHourInString } from "../../utils/getCurrentDateInString";

type Compromisso = {
    id: number;
    horarioInicio: string;
    horarioTermino: string;
    dataAgendadaString: string;
    dataAgendadaDayOfTheWeek: number;
    selectedClient: number;
    tipo: string;
    status: string;
};

type CompromissoProps = {
    compromissos: Compromisso[];
};

type FilterType = "hoje" | "semana" | "semFiltro";

const CompromissoRow: FunctionComponent<{ compromisso: Compromisso }> = ({
    compromisso,
}) => {
    return (
        <>
            <tr key={compromisso.id}>
                <td>{compromisso.selectedClient}</td>
                <td>
                    {compromisso.horarioInicio} - {compromisso.horarioTermino}
                </td>
                <td>{compromisso.tipo}</td>
                <td>{compromisso.status}</td>
                <td>{compromisso.dataAgendadaString}</td>
            </tr>
        </>
    );
};

function filterCompromissoByType(
    filterType: FilterType,
    compromissos: Compromisso[]
) {
    switch (filterType) {
        case "hoje":
            return compromissos.filter(
                (compromisso) =>
                    compromisso.dataAgendadaString ===
                    getCurrentDateHourInString(new Date()) //TODO Filtrar por dia
            );
        case "semana":
            return compromissos.filter(
                (compromisso) =>
                    compromisso.dataAgendadaString ===
                    "getCurrentDateHourInString(new Date())" //TODO Filtrar por semana
            );
        default:
            return compromissos;
    }
}

export default function Agenda({ compromissos }: CompromissoProps) {
    const [compromissoFilter, setCompromissoFilter] =
        useState<FilterType>("hoje");

    useEffect(() => {
        compromissos = filterCompromissoByType(compromissoFilter, compromissos);
    }, [compromissoFilter]);

    console.log(getCurrentDateHourInString(new Date()));

    return (
        <>
            <Head>
                <title>Agenda | Artha</title>
            </Head>

            <main>
                <ScheduleHeader />

                <button onClick={() => setCompromissoFilter("hoje")}>Hoje</button>
                <button onClick={() => setCompromissoFilter("semana")}>Semana</button>
                <button onClick={() => setCompromissoFilter("semFiltro")}>Todos</button>
                <table>
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Ínicio-Término</th>
                            <th>Tipo</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {compromissos.map((compromisso) => (
                            <CompromissoRow key={compromisso.id} compromisso={compromisso} />
                        ))}
                    </tbody>
                </table>
            </main>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await api.get("/schedule", {
        params: {
            _sort: "data",
            _order: "incr",
        },
    });

    const compromissos = data.map((compromisso) => {
        return {
            id: compromisso.id,
            horarioInicio: compromisso.horario_inicio,
            horarioTermino: compromisso.horario_termino,
            dataAgendadaString: compromisso.data_agendada,
            dataAgendadaDayOfTheWeek: new Date(compromisso.data_agendada).getDay(),
            selectedClient: compromisso.cliente_selecionado,
            tipo: compromisso.tipo_compromisso,
            status: compromisso.compromisso_status,
        };
    });

    return {
        props: {
            compromissos: compromissos,
        },
    };
};
