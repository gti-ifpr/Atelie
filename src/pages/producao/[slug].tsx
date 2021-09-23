import { api } from '../../services/api';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { useCommitment } from "../../hooks/useCommitment";

import styles from './production.module.scss';
import { isDayAndHourLessThenToday } from '../../utils/isDayAndHourLessThenToday';

type Production = {
    clienteSelecionado: number;
    id: number
};

type ProductionProps = {
    production: Production;
}

export default function Prodution({ production }: ProductionProps) {
    const { compromissos } = useCommitment();

    return (
        <>
            <Head>
                <title>{production.id} | Artha</title>
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
                    {compromissos.map((compromisso) => {
                        if (compromisso.selectedClient === production.clienteSelecionado) {
                            return (
                                <tbody key={compromisso.id}>
                                    <tr
                                        className={isDayAndHourLessThenToday(compromisso.dataAgendadaString, compromisso.horarioInicio) ? styles.dayAndHourLessThenToday : ''}
                                    >
                                        <td>
                                            {compromisso.horarioInicio} - {compromisso.horarioTermino}
                                        </td>
                                        <td>{compromisso.tipo}</td>
                                        <td>{compromisso.status}</td>
                                        <td>{compromisso.dataAgendadaPtBr}</td>
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

    const { data } = await api.get(`/producoes/${slug}`)

    const production = {
        clienteSelecionado: data.clienteSelecionado,
        id: data.id
    };

    return {
        props: {
            production,
        }
    }
}