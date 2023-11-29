import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import { Provider } from 'react-redux'
import { store } from '../State/store'
import Alert from '../components/Alert';

function MyApp({ Component, pageProps }: AppProps) {
  return<Provider store={store}>
  
    <Navbar/>
     <Alert/>
    <Component {...pageProps} />
  
  </Provider> 
}

export default MyApp
