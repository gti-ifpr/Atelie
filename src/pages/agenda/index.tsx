import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { ScheduleHeader } from '../../components/Schedule/ScheduleHeader'
import { api } from '../../services/api'

type Compromisso = {
    id: number;
    horarioInicio: string;
    horarioTermino: string;
    dataAgendada: string;
    selectedClient: number;
    tipo: string;
    status: string;
}

type CompromissoProps = {
    schedule: Compromisso[];
}

export default function Agenda({ schedule }: CompromissoProps) {
    const [day, setDay] = useState('');

    function checkIfIsToday(day) {
        return day === new Date().toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    return (
        <>
            <Head>
                <title>Agenda | Artha</title>
            </Head>

            <main>
                <ScheduleHeader />

                <button>
                    Hoje
                </button>
                <table>
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Ínicio-Termino</th>
                            <th>Tipo</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map(schedule => (
                            <tr key={schedule.id}>
                                <td>{schedule.selectedClient}</td>
                                <td>{schedule.horarioInicio} - {schedule.horarioTermino}</td>
                                <td>{schedule.tipo}</td>
                                <td>{schedule.status}</td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await api.get('/schedule', {
        params: {
            _limit: 5,
            _sort: 'data',
            _order: 'incr',
        }
    })

    const compromissos = data.map(compromisso => {
        return {
            id: compromisso.id,
            horarioInicio: compromisso.horario_inicio,
            horarioTermino: compromisso.horario_termino,
            dataAgendada: new Date(compromisso.data_agendada).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }),
            selectedClient: compromisso.cliente_selecionado,
            tipo: compromisso.tipo_compromisso,
            status: compromisso.compromisso_status,
        };
    })

    return {
        props: {
            schedule: compromissos,
        }
    }
}