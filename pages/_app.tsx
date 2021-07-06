import { AppProps } from 'next/app'
import Layout from '../components/Layout'
import '../styles/main.scss'

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
