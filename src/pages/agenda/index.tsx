import { GetServerSideProps } from 'next'
import Head from 'next/head'
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
    return (
        <>
            <Head>
                <title>Agenda | Artha</title>
            </Head>

            <main>
                <ScheduleHeader />
                {schedule.map(schedule => {
                    return (
                        <div>
                            {schedule.selectedClient}
                        </div>
                    )
                })}

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
            dataAgendada: compromisso.data_agendada,
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