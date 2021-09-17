import { api } from '../../services/api';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { useProduction } from "../../hooks/useProduction";

import styles from './schedule.module.scss';
import { isDayAndHourLessThenToday } from '../../utils/isDayAndHourLessThenToday';

type Schedule = {
    selectedClient: number;
    id: number
};

type ScheduleProps = {
    schedule: Schedule;
}

export default function Schedule({ schedule }: ScheduleProps) {
    const { producoes } = useProduction();

    return (
        <>
            <Head>
                <title>{schedule.id} | Artha</title>
            </Head>

            <main className={styles.contentContainer}>
                <table>
                    <thead>
                        <tr>
                            <th>Ínicio-Término</th>
                            <th>Tipo</th>
                            <th>Status</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    {producoes.map((producao) => {
                        if (producao.selectedClient === schedule.selectedClient) {
                            return (
                                <tbody key={producao.id}>
                                    <tr
                                        className={isDayAndHourLessThenToday(producao.dataAgendadaString, producao.horarioInicio) ? styles.dayAndHourLessThenToday : ''}
                                    >
                                        <td>
                                            {producao.horarioInicio} - {producao.horarioTermino}
                                        </td>
                                        <td>{producao.tipo}</td>
                                        <td>{producao.status}</td>
                                        <td>{producao.dataAgendadaPtBr}</td>
                                    </tr>
                                </tbody>
                            )
                        }
                    })}
                </table>
            </main>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { slug } = ctx.params

    const { data } = await api.get(`/schedule/${slug}`)

    const schedule = {
        selectedClient: data.cliente_selecionado,
        id: data.id
    };

    return {
        props: {
            schedule,
        }
    }
}