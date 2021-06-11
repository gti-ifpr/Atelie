import styles from './job.module.scss'
import { api } from '../../services/api';
import { GetServerSideProps, GetStaticPaths } from 'next';
import Head from 'next/head';

type Job = {
    id: string;
    cliente: string;
    prova: string;
    tecido: string;
    dataInicio: string;
    dataEntrega: string;
}

type JobProps = {
    job: Job;
}

export default function Job({ job }: JobProps) {
    return (
        <>
            <Head>
                <title>{job.cliente} | Artha</title>
            </Head>

            <main className={styles.jobContainer}>
                <h1>{job.cliente}</h1>
                <div className={styles.contentContainer}>
                    <div>
                        <span>Prova:</span>
                        <h2>{job.prova}</h2>
                    </div>
                    <div>
                        <span>Tecido:</span>
                        <h2>{job.tecido}</h2>
                    </div>
                </div>
                <span>Data Início</span>
                <p>{job.dataInicio}</p>
                <span>Data entrega</span>
                <p>{job.dataEntrega}</p>
            </main>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { slug } = ctx.params

    const { data } = await api.get(`/jobs/${slug}`)

    const job = {
        id: data.id,
        cliente: data.cliente,
        tecido: data.tecido,
        prova: data.prova,
        dataInicio: data.data_inicio,
        dataEntrega: data.data_entrega,
    };

    return {
        props: {
            job,
        }
    }
}