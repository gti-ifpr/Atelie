import { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { CommitmentProvider } from '../hooks/useCommitment'
import { ClientProvider } from '../hooks/useClient'

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ClientProvider>
      <CommitmentProvider>
        <Header />


        <Component {...pageProps} />
      </CommitmentProvider>
    </ClientProvider>
  )
}

export default MyApp
