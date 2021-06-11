import Head from 'next/head';
import { api } from '../services/api';
import { GetServerSideProps } from 'next';
import React from 'react';
import Link from 'next/link';

import styles from './home.module.scss'

type Job = {
  id: string;
  cliente: string;
  prova: string;
}

type JobsTableProps = {
  jobs: Job[];
}


export default function Home({ jobs }: JobsTableProps) {
  return (
    <>
      <Head>
        <title>Home | Artha</title>
      </Head>

      <main className={styles.contentContainer}>

        {jobs.map(job => {
          return (
            <div key={job.id} className={styles.jobsContent}>
              <Link href={`/jobs/${job.id}`}>
                <button className={styles.card}>
                  <div className={styles.cardHeader}>
                    <p>{job.cliente}</p>
                    <span className={styles.active}>Prova Ativa</span>
                  </div>
                  <div className={styles.testColumn}>
                    <span>Prova</span>
                    <p>{job.prova}</p>
                  </div>
                  <div className={styles.deadlineColumn}>
                    <span>Prazo</span>
                    <p>8 dias para entrega</p>
                  </div>
                </button>
              </Link>
            </div>
          )
        })}
      </main>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get('/jobs', {
    params: {
      _limit: 12,
      _sort: 'data',
      _order: 'incr',
    }
  })

  return {
    props: {
      jobs: data,
    }
  }
}