import { AppProps } from 'next/app'
import { Header } from '../components/Header/header'

import { ClientProvider } from '../hooks/useClient'
import { ClothingCollectionsProvider } from '../hooks/useClothingCollections'
import { FilterClothByCollectionProvider } from '../hooks/useFilterClothByCollection'
import { ClothProvider } from '../hooks/useCloth'
import { CommitmentProvider } from '../hooks/useCommitment'
import { SaleProvider } from '../hooks/useSale'
import { CartProvider } from '../hooks/useCart'
import { FabricProvider } from '../hooks/useFabric'

import '../styles/global.scss';
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ClientProvider>
      <CommitmentProvider>
        <ClothingCollectionsProvider>
          <ClothProvider>
            <FabricProvider>
              <FilterClothByCollectionProvider>
                <SaleProvider>
                  <CartProvider>
                    <Toaster
                      toastOptions={{
                        style: {
                          border: '0.15rem solid var(--yellow-800)',
                          padding: '1rem',
                        },
                        iconTheme: {
                          primary: 'var(--yellow-500)',
                          secondary: '#FFFAEE',
                        },
                      }} />

                    <Header />


                    <Component {...pageProps} />
                  </CartProvider>
                </SaleProvider>
              </FilterClothByCollectionProvider>
            </FabricProvider>
          </ClothProvider>
        </ClothingCollectionsProvider>
      </CommitmentProvider>
    </ClientProvider>
  )
}

export default MyApp
