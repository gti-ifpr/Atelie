import Head from 'next/head';
import { JobsTable } from '../components/JobsTable';

import styles from './home.module.scss'
import { api } from '../services/api';

import { GetServerSideProps } from 'next';

type Job = {
  id: string;
  cliente: string;
  prova: string;
}

type JobsTableProps = {
  jobs: Job[];
}


export default function Home(props: JobsTableProps) {

  return (
    <>
      <Head>
        <title>Home | Artha</title>
      </Head>
      <main className={styles.contentContainer}>
        <JobsTable jobs={props} />
      </main>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get('/jobs', {
    params: {
      _limit: 12,
      _sort: 'data',
      _order: 'incr'
    }
  })

  return {
    props: {
      jobs: data,
    }
  }
}