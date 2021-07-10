import { AppProps } from 'next/app'
import { Header } from '../components/Header/header'
import { CommitmentProvider } from '../hooks/useCommitment'
import { ClientProvider } from '../hooks/useClient'
import { ClothingCollectionsProvider } from '../hooks/useClothingCollections'
import { ClothProvider } from '../hooks/useCloth'

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ClientProvider>
      <CommitmentProvider>
        <ClothingCollectionsProvider>
          <ClothProvider>
            <Header />


            <Component {...pageProps} />
          </ClothProvider>
        </ClothingCollectionsProvider>
      </CommitmentProvider>
    </ClientProvider>
  )
}

export default MyApp
