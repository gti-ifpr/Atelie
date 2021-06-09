import Head from 'next/head';

import styles from './home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Artha</title>
      </Head>

      <h1 className={styles.title}>Página Principal</h1>
    </>
  )
}
