import { GetServerSideProps } from "next";
import Head from "next/head";
import { FunctionComponent, useEffect, useState } from "react";
import { ScheduleHeader } from "../../components/Schedule/ScheduleHeader";
import { api } from "../../services/api";
import { getCurrentDateHourInString } from "../../utils/getCurrentDateInString";
import { getFirstDayOfTheWeek } from "../../utils/getFirstDayOfTheWeek";

type Compromisso = {
    id: number;
    horarioInicio: string;
    horarioTermino: string;
    dataAgendadaString: string;
    dataAgendadaDayOfTheWeek: number;
    dataAgendadaCurrentDate: number;
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
                <td>{compromisso.dataAgendadaCurrentDate}</td>
            </tr>
        </>
    );
};


function filterCompromissoByType(
    filterType: FilterType,
    compromissos: Compromisso[],
    selectedDayOfTheWeek: number
) {
    switch (filterType) {
        case "hoje":
            return compromissos.filter(
                (compromisso) => compromisso.dataAgendadaString === getCurrentDateHourInString(new Date()));
        case "semana":
            const { firstDayOfTheWeek, lastDayOfTheWeek } = getFirstDayOfTheWeek(new Date());

            console.log(compromissos)
            return compromissos.filter(
                (compromisso) =>
                ((compromisso.dataAgendadaCurrentDate >= firstDayOfTheWeek &&
                    compromisso.dataAgendadaCurrentDate <= lastDayOfTheWeek) &&
                    (compromisso.dataAgendadaDayOfTheWeek === selectedDayOfTheWeek))
            );
        default:
            return compromissos;
    }
}

export default function Agenda({ compromissos }: CompromissoProps) {
    const [compromissoFilter, setCompromissoFilter] = useState<FilterType>("hoje");

    const [compromissosFiltrados, setCompromissosFiltrados] = useState<Compromisso[]>([])
    const [selectedDayOfTheWeek, setSelectedDayOfTheWeek] = useState<number>(0)


    useEffect(() => {
        setCompromissosFiltrados(
            filterCompromissoByType(compromissoFilter, compromissos, selectedDayOfTheWeek)
        )
    }, [compromissoFilter, selectedDayOfTheWeek]);

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
                {(compromissoFilter === "semana") &&
                    <>
                        <button onClick={() => setSelectedDayOfTheWeek(0)}>Segunda</button>
                        <button onClick={() => setSelectedDayOfTheWeek(1)}>Terça</button>
                        <button onClick={() => setSelectedDayOfTheWeek(2)}>Quarta</button>
                        <button onClick={() => setSelectedDayOfTheWeek(3)}>Quinta</button>
                        <button onClick={() => setSelectedDayOfTheWeek(4)}>Sexta</button>
                        <button onClick={() => setSelectedDayOfTheWeek(5)}>Sábado</button>
                        <button onClick={() => setSelectedDayOfTheWeek(6)}>Domingo</button>
                    </>
                }
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
                        {compromissosFiltrados.map((compromisso) => (
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
            dataAgendadaCurrentDate: new Date(compromisso.data_agendada).getDate() + 1,
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
