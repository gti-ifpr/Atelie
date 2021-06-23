import { GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";
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
    schedule: Compromisso[];
};

export default function Agenda({ schedule }: CompromissoProps) {
    const [filtrarPorDia, setFiltrarPorDia] = useState("hoje");


    return (
        <>
            <Head>
                <title>Agenda | Artha</title>
            </Head>

            <main>
                <ScheduleHeader />

                <button onClick={() => setFiltrarPorDia("hoje")}>Hoje</button>
                <button onClick={() => setFiltrarPorDia("semana")}>Semana</button>
                <button onClick={() => setFiltrarPorDia("todos")}>Todos</button>
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
                        {filtrarPorDia === "hoje" &&

                          const compromissosDoDia = schedule.filter(
                            (compromisso) => compromisso.dataAgendadaString === getCurrentDateHourInString(new Date())
                        );
                    
                            compromissosDoDia.map((schedule) => (
                        <tr key={schedule.id}>
                            <td>{schedule.selectedClient}</td>
                            <td>
                                {schedule.horarioInicio} - {schedule.horarioTermino}
                            </td>
                            <td>{schedule.tipo}</td>
                            <td>{schedule.status}</td>
                            <td>{schedule.dataAgendadaString}</td>
                        </tr>
                            ))}

                        {filtrarPorDia === "todos" &&
                            schedule.map((schedule) => (
                                <tr key={schedule.id}>
                                    <td>{schedule.selectedClient}</td>
                                    <td>
                                        {schedule.horarioInicio} - {schedule.horarioTermino}
                                    </td>
                                    <td>{schedule.tipo}</td>
                                    <td>{schedule.status}</td>
                                    <td></td>
                                </tr>
                            ))}

                        {filtrarPorDia === "todos" &&
                            schedule.map((schedule) => (
                                <tr key={schedule.id}>
                                    <td>{schedule.selectedClient}</td>
                                    <td>
                                        {schedule.horarioInicio} - {schedule.horarioTermino}
                                    </td>
                                    <td>{schedule.tipo}</td>
                                    <td>{schedule.status}</td>
                                    <td></td>
                                </tr>
                            ))}

                        {/* {filtrarPorDia === "semana" &&
                            <filtrarPorSemana />
                        } */}
                    </tbody>
                </table>
            </main>
        </>
    );
}



export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await api.get("/schedule", {
        params: {
            _limit: 7,
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
            schedule: compromissos,
        },
    };
};
