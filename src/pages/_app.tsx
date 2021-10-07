import { AppProps } from 'next/app'
import { Header } from '../components/Header/header'

import { ClientProvider } from '../hooks/useClient'
import { ClothingCollectionsProvider } from '../hooks/useClothingCollections'
import { FilterClothByCollectionProvider } from '../hooks/useFilterClothByCollection'
import { ClothProvider } from '../hooks/useCloth'
import { CommitmentProvider } from '../hooks/useCommitment'
import { ProductionProvider } from '../hooks/useProduction'
import { SaleProvider } from '../hooks/useSale'
import { CartProvider } from '../hooks/useCart'
import { FabricProvider } from '../hooks/useFabric'
import { BudgedProvider } from '../hooks/useBudged'
import { TechnicalFileProvider } from '../hooks/useTechnicalFile'
import { AviamentoProvider } from '../hooks/useAviamento'

import '../styles/global.scss';
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ClientProvider>
      <CommitmentProvider>
        <ProductionProvider>
          <ClothingCollectionsProvider>
            <ClothProvider>
              <FabricProvider>
                <AviamentoProvider>
                  <BudgedProvider>
                    <TechnicalFileProvider>
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
                    </TechnicalFileProvider>
                  </BudgedProvider>
                </AviamentoProvider>
              </FabricProvider>
            </ClothProvider>
          </ClothingCollectionsProvider>
        </ProductionProvider>
      </CommitmentProvider>
    </ClientProvider>
  )
}

export default MyApp
