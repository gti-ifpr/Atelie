import { GetServerSideProps } from "next";
import Head from "next/head";
import { FunctionComponent, useEffect, useState, Fragment } from "react";
import { ScheduleHeader } from "../../components/Schedule/ScheduleHeader";
import { api } from "../../services/api";
import { addOneDay } from "../../utils/addOneDay";
import { Button } from "../../components/Button";

import styles from './styles.module.scss'

import { getCurrentDateHourInString } from "../../utils/getCurrentDateInString";
import { getFirstDayOfTheWeek } from "../../utils/getFirstDayOfTheWeek";

type Compromisso = {
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
                <td>{compromisso.dataAgendadaPtBr}</td>
                <td>{compromisso.dataAgendadaDayOfTheWeek}</td>
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

            <main className={styles.contentContainer}>
                <ScheduleHeader />

                <div className={styles.filterType}>
                    <Button isActive={compromissoFilter === "hoje"} onClick={() => setCompromissoFilter("hoje")}>Hoje</Button>
                    <Button isActive={compromissoFilter === "semana"} onClick={() => setCompromissoFilter("semana")}>Semana</Button>
                    <Button isActive={compromissoFilter === "semFiltro"} onClick={() => setCompromissoFilter("semFiltro")}>Todos</Button>
                </div>

                {(compromissoFilter === "semana") &&
                    <div className={styles.weekFilterType}>
                        <Button isActive={selectedDayOfTheWeek === 0} onClick={() => setSelectedDayOfTheWeek(0)}>Domingo</Button>
                        <Button isActive={selectedDayOfTheWeek === 1} onClick={() => setSelectedDayOfTheWeek(1)}>Segunda</Button>
                        <Button isActive={selectedDayOfTheWeek === 2} onClick={() => setSelectedDayOfTheWeek(2)}>Terça</Button>
                        <Button isActive={selectedDayOfTheWeek === 3} onClick={() => setSelectedDayOfTheWeek(3)}>Quarta</Button>
                        <Button isActive={selectedDayOfTheWeek === 4} onClick={() => setSelectedDayOfTheWeek(4)}>Quinta</Button>
                        <Button isActive={selectedDayOfTheWeek === 5} onClick={() => setSelectedDayOfTheWeek(5)}>Sexta</Button>
                        <Button isActive={selectedDayOfTheWeek === 6} onClick={() => setSelectedDayOfTheWeek(6)}>Sábado</Button>
                    </div>
                }
                <table>
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Ínicio-Término</th>
                            <th>Tipo</th>
                            <th>Status</th>
                            <th>Data</th>
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
            dataAgendadaPtBr: new Date(addOneDay(compromisso.data_agendada)).toLocaleDateString('pt-BR'),
            dataAgendadaDayOfTheWeek: new Date(addOneDay(compromisso.data_agendada)).getDay(),
            dataAgendadaCurrentDate: new Date(addOneDay(compromisso.data_agendada)).getDate(),
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
