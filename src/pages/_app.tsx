import { AppProps } from 'next/app'
import { Header } from '../components/Header/header'

import { ClientProvider } from '../hooks/useClient'
import { ClothingCollectionsProvider } from '../hooks/useClothingCollections'
import { FilterClothByCollectionProvider } from '../hooks/useFilterClothByCollection'
import { ClothProvider } from '../hooks/useCloth'
import { CommitmentProvider } from '../hooks/useCommitment'
import { SaleProvider } from '../hooks/useSale'
import { CartProvider } from '../hooks/useCart'

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ClientProvider>
      <CommitmentProvider>
        <ClothingCollectionsProvider>
          <ClothProvider>
            <FilterClothByCollectionProvider>
              <SaleProvider>
                <CartProvider>
                  <Header />


                  <Component {...pageProps} />
                </CartProvider>
              </SaleProvider>
            </FilterClothByCollectionProvider>
          </ClothProvider>
        </ClothingCollectionsProvider>
      </CommitmentProvider>
    </ClientProvider>
  )
}

export default MyApp
