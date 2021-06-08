import { AppProps } from 'next/app';
import { Header } from '../components/header';
import { Grid } from '@material-ui/core';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Grid container direction="column">

      <Grid item>
        <Header />
      </Grid>

      <Grid item container>
        <Grid>
          <Component {...pageProps} />
        </Grid>
      </Grid>
    </Grid>

  )
}

export default MyApp
