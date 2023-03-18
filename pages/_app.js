import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
// import Navbar from '../components/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// import { DataProvider } from '../store/GlobalState';
// import Notify from '../components/Notify';
function MyApp({ Component, pageProps }) {
  return <ThemeProvider enableSystem={true}
    attribute="class">
    <ToastContainer />

    {/* <Navbar /> */}

    {/* <Notify /> */}

    <Component {...pageProps} />
  </ThemeProvider>

}

export default MyApp
