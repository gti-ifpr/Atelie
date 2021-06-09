import Head from 'next/head';
import { JobsTable } from '../components/JobsTable';

import styles from './home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Artha</title>
      </Head>
      <main className={styles.contentContainer}>
        <JobsTable />
      </main>
    </>
  )
}
